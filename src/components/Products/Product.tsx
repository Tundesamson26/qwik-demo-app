/* eslint-disable qwik/no-use-visible-task */
import type { PropsOf } from "@builder.io/qwik";
import { component$, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { type NoSerialize, noSerialize } from "@builder.io/qwik";
import type { Item } from "../../lib/ts-rest/contract.ts";
import { Card } from "~/components/ui/card/card.tsx";
import { Button } from "~/components/ui/button/button.tsx";
import { Input } from "~/components/ui/input/input.tsx";
import { cn } from "@qwik-ui/utils";

interface ProductStore {
  worker: NoSerialize<Worker>;
  items: Item[];
  newItemName: string;
  newItemDescription: string;
}

type CardProps = PropsOf<typeof Card.Root>;

export const Product = component$<CardProps>(({ ...props }) => {
  const store = useStore<ProductStore>({
    worker: undefined as any as NoSerialize<Worker>,
    items: [],
    newItemName: "",
    newItemDescription: "",
  });

  useVisibleTask$(() => {
    const worker = new Worker(
      new URL("../../lib/worker/db-worker.ts", import.meta.url),
      { type: "module" }
    );
    store.worker = noSerialize(worker);

    worker.onmessage = (event) => {
      if (
        event.data.type === "ITEMS_SYNCED" ||
        event.data.type === "ITEMS_RETRIEVED"
      ) {
        store.items = event.data.payload;
        console.log(store.items);
      } else if (event.data.type === "ITEM_ADDED") {
        store.items.push(event.data.payload);
        store.newItemName = "";
        store.newItemDescription = "";
      } else if (event.data.type === "ERROR") {
        console.error("Error in Web Worker:", event.data.payload);
      }
    };

    worker.postMessage({ type: "SYNC_ITEMS" });

    return () => {
      worker.terminate();
    };
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
        {store.items.map((item) => (
          <Card.Root key={item.id} class={cn("w-full", props.class)} {...props}>
            <Card.Header class="font-bold">{item.name}</Card.Header>
            <Card.Content>{item.description}</Card.Content>
            <Card.Footer>
              (Created: {new Date(item.createdAt).toLocaleString()})
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
    </div>
  );
});
