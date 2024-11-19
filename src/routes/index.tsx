import type { DocumentHead } from "@builder.io/qwik-city";
/* eslint-disable qwik/no-use-visible-task */
import {
  component$,
  useStore,
  useVisibleTask$,
  useSignal,
  $,
  useTask$,
} from '@builder.io/qwik';
import { routeLoader$, routeAction$, server$, Form } from '@builder.io/qwik-city';
import { type NoSerialize, noSerialize } from "@builder.io/qwik";
import type { Item } from "../../src/lib/ts-rest/contract.ts";
import { Card } from "~/components/ui/card/card.tsx";
import { Button } from "~/components/ui/button/button.tsx";
import { Input } from "~/components/ui/input/input.tsx";
import { cn } from "@qwik-ui/utils";

const testWorker = (store: ProductStore) => {
  if (typeof Worker !== "undefined") {
    const worker = new Worker(
      new URL("../../src/lib/worker/db-worker.ts", import.meta.url),
      { type: "module" }
    );
    store.worker = noSerialize(worker);

    worker.onmessage = (event) => {
      if (event.data.type === "ITEMS_SYNCED" || event.data.type === "ITEMS_RETRIEVED") {
        store.items = event.data.payload;
      } else if (event.data.type === "ITEM_ADDED") {
        store.items.push(event.data.payload);
        store.newItemName = "";
        store.newItemDescription = "";
      } else if (event.data.type === "ERROR") {
        console.error("Error in Web Worker:", event.data.payload);
      }
    };

    worker.postMessage({ type: "SYNC_ITEMS" });

    return () => worker.terminate();
  }
};

interface ProductStore {
  worker: NoSerialize<Worker>;
  items: Item[];
  newItemName: string;
  newItemDescription: string;
}

export const useProductLoader = routeLoader$(async () => {
  const response = await fetch("http://localhost:3000/items");
  return (await response.json()) as Item[];
});

export const useProductVoteAction = routeAction$((props) => {
  console.log('VOTE ACTION:', props);
  // Handle the vote or any action you need to perform on the server
});

export default component$(() => {
  const store = useStore<ProductStore>({
    worker: undefined as any as NoSerialize<Worker>,
    items: [],
    newItemName: "",
    newItemDescription: "",
  });

  // Signal to track favorite status or other client-side state
  const isFavoriteSignal = useSignal(false);

  // Load items using the routeLoader$
  const productLoader = useProductLoader();
  
  // Form action for voting or submitting data
  const productVoteAction = useProductVoteAction();

  // Client-side: Sync IndexedDB and Backend API via Worker
  useVisibleTask$(() => {
    testWorker(store);
  });

  const addItem = $(async () => {
    if (store.worker) {
      store.worker.postMessage({
        type: "ADD_ITEM",
        payload: {
          name: store.newItemName,
          description: store.newItemDescription,
        },
      });
    }
  });

  // useTask$ to handle client-side reactivity
  useTask$(({ track }) => {
    track(() => isFavoriteSignal.value);
    console.log('Favorite status:', isFavoriteSignal.value);

    // Server-side logging via server$
    server$(() => {
      console.log('Favorite status (server-side):', isFavoriteSignal.value);
    })();
  });

  return (
    <div class="w-full">
      <h3 class="text-center mt-3">Add a new item:</h3>
      <div class="w-1/3 flex-col align-middle mx-auto">
        <Input
          type="text"
          value={store.newItemName}
          onInput$={(e) =>
            (store.newItemName = (e.target as HTMLInputElement).value)
          }
          placeholder="Item name"
          class="rounded-md p-2 my-2"
        />
        <Input
          type="text"
          value={store.newItemDescription}
          onInput$={(e) =>
            (store.newItemDescription = (e.target as HTMLInputElement).value)
          }
          placeholder="Item description"
          class="rounded-md p-2"
        />
        <Button onClick$={addItem} class="w-fit rounded-md p-3 my-2">
          Add Item
        </Button>
      </div>

      <h3 class="my-2">All Items:</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productLoader.value?.map((item) => (
          <Card.Root key={item.id} class={cn("w-full")}>
            <Card.Header class="font-bold">{item.name}</Card.Header>
            <Card.Content>{item.description}</Card.Content>
            <Card.Footer>
              (Created: {new Date(item.createdAt).toLocaleString()})
            </Card.Footer>
            <Form action={productVoteAction}>
              <input type="hidden" name="productId" value={item.id} />
              <Button name="vote" value="up" class="p-2 mx-1">👍</Button>
              <Button name="vote" value="down" class="p-2 mx-1">👎</Button>
            </Form>
          </Card.Root>
        ))}
      </div>

      <button
        onClick$={() => (isFavoriteSignal.value = !isFavoriteSignal.value)}
        class="p-2 rounded-md bg-red-500 text-white"
      >
        {isFavoriteSignal.value ? '❤️' : '🤍'}
      </button>
    </div>
  );
});


export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

