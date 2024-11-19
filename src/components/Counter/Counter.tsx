/* eslint-disable qwik/no-use-visible-task */
import { component$, $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type NoSerialize, noSerialize } from "@builder.io/qwik";
import { trpc } from "../../lib/trpc/client";

interface CounterStore {
  worker: NoSerialize<Worker>;
  lastAddedItem: { id: number; name: string } | null;
  items: { id: number; name: string }[];
  newItemName: string;
}

export const Counter = component$(() => {
  const store = useStore<CounterStore>({
    worker: undefined as any as NoSerialize<Worker>,
    lastAddedItem: null,
    items: [],
    newItemName: "",
  });

  useVisibleTask$(() => {
    const worker = new Worker(
      new URL("../../lib/worker/db-worker.ts", import.meta.url),
      { type: "module" }
    );
    store.worker = noSerialize(worker);

    worker.onmessage = (event) => {
      if (event.data.type === "ITEM_ADDED") {
        console.log("Item added to IndexedDB:", event.data.payload);
        store.lastAddedItem = event.data.payload;
        store.items.push(event.data.payload);
        store.newItemName = "";
      } else if (event.data.type === "ITEMS_RETRIEVED") {
        console.log("Items retrieved from IndexedDB:", event.data.payload);
        store.items = event.data.payload;
      } else if (event.data.type === "ERROR") {
        console.error("Error in Web Worker:", event.data.payload);
      }
    };

    if (store.worker) {
      store.worker.postMessage({ type: "RETRIEVE_ITEMS" });
    } else {
      console.error("Worker is not initialized");
    }

    return () => {
      worker.terminate();
    };
  });

  const addItem = $(async () => {
    if (store.worker) {
      store.worker.postMessage({
        type: "ADD_ITEM",
        payload: { name: store.newItemName },
      });
    }

    try {
      const result = await trpc.addItem.mutate({ name: store.newItemName });
      console.log("Item added via tRPC:", result);
    } catch (error) {
      console.error("Error adding item via tRPC:", error);
    }
  });

  const updateNewItemName = $((event: Event) => {
    store.newItemName = (event.target as HTMLInputElement).value;
  });

  return (
    <div>
      <h3>Add a new item:</h3>
      <input
        type="text"
        value={store.newItemName}
        onInput$={updateNewItemName}
        class="bg-gray-200 rounded-md p-2"
      />
      <button onClick$={addItem} class="w-fit bg-blue-300 rounded-md p-3">
        Add Item
      </button>

      <h3>All Items:</h3>
      <ul>
        {store.items.map((item) => (
          <li key={item.id}>
            ID {item.id}, Name: {item.name}
          </li>
        ))}
      </ul>

      {store.lastAddedItem && (
        <p>
          Last added item: ID {store.lastAddedItem.id}, Name:{" "}
          {store.lastAddedItem.name}
        </p>
      )}
    </div>
  );
});
