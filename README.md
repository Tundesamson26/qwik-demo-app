## Overview of the Technology Used
Built a demo application with Qwik, IndexedDB, Web Workers, and tRPC that offers significant advantages in terms of performance, scalability, and developer productivity.

1. **Qwik**

Role: Frontend Framework for Optimized Web Performance

**Advantages**:
* Resumability: Qwik is designed for extremely lazy loading and resumability, meaning it can deliver near-instant interactivity on large web pages by loading only the necessary JavaScript for the user's interaction.
* Minimal JavaScript on Load: Qwik avoids the "hydration" step common in other frameworks (e.g., React, Vue) by using a resumable approach, reducing the amount of JavaScript that needs to be executed on page load.
* Optimized for SEO: Since Qwik focuses on server-side rendering (SSR) with minimal client-side JavaScript, it allows faster page loads and better performance in search engines.

**How and Where It's Used**: Qwik is used for building the frontend of our application. It handles UI rendering, routing, and providing a reactive user experience. We use it to write components that get compiled into minimal, lazy-loaded JavaScript, enabling fast and responsive web pages.

2. **IndexedDB**

Role: Client-Side Database for Offline Storage

**Advantages**:
* Persistent Storage: IndexedDB allows our application to store large amounts of data locally in the browser, enabling persistent storage even after the page is closed.
* Asynchronous Access: It provides a powerful, non-relational database that supports complex queries and indexing. It's ideal for storing structured data, such as user-generated content, offline application data, or cache data.
* Offline Capabilities: IndexedDB enables offline access to data, making your application resilient to network failures and providing a seamless experience when the internet is unavailable.

**How and Where It's Used**: IndexedDB is typically used in the frontend of our application to store user data, cached API responses, or other persistent data. It can work in conjunction with a service worker or web worker to synchronize data with the server when the network is available.

3. **Web Workers**

Role: Background Processing for Parallelism

**Advantages**:
* Offloading Work: Web Workers allow us to run JavaScript code in parallel on background threads, enabling our main thread (which handles UI rendering) to remain responsive.
* Performance Improvements: By offloading computationally expensive tasks (e.g., data processing, complex calculations) to Web Workers, our application can maintain a smooth user experience even during heavy processing.
* Concurrency: Web Workers can perform tasks asynchronously without blocking the main UI thread, which is crucial for performance-sensitive applications.

**How and Where It's Used**: Web Workers are used for background tasks that would otherwise slow down the main thread, such as processing large datasets, handling complex calculations, or interacting with IndexedDB. In a Qwik application, they can keep the UI responsive while performing heavy lifting in the background.

4. **tRPC**

Role: Type-Safe End-to-End API Communication

**Advantages**:
* Type Safety: tRPC provides end-to-end type safety by generating TypeScript types for our API routes, ensuring that both the client and server adhere to the same contract.
* No Boilerplate: tRPC eliminates the need for REST or GraphQL boilerplate code (e.g., defining schema, serializers, and deserializers) by automatically generating client code from our backend routes.
* Improved Developer Experience: Type safety and autocompletion in our IDE reduce the chance of runtime errors, speeding up development and reducing bugs.

**How and Where It's Used**: tRPC is typically used for building type-safe APIs between our frontend and backend. It allows our Qwik frontend to make type-safe API calls to our backend services without needing to write redundant code. It's ideal for building applications where we want a seamless connection between the client and server with minimal overhead.

## Rendering on the Qwik Client

The `src/component/Products/Product.tsx` display our application to the client, since we are using Qwik framework for the client side.

## Using Web Worker

This script is a Web Worker that handles background synchronization between an `IndexedDB` instance and the `ts-rest` mock RESTful API. The worker listens for messages from the main thread and can:

1. Synchronize items from the `API` into the `IndexedDB`.
2. Add new items both to the `API` and the `IndexedDB`.
3. Retrieve items from the `IndexedDB`.

The worker uses `ts-rest` for API interactions and IndexedDB for local storage. The communication between the worker and the main thread is done through message-passing.

Inside the `lib` directory, there is a `worker` folder with a `db-worker.ts` file. This file uses the web worker to interact with both the API and IndexedDB.

First, import the pre-configured API client from `ts-rest/client.ts.` The `api` object provides methods for interacting with the server and the function that initializes the IndexedDB instance.

```
import { client as api } from '../ts-rest/client';
import { initDB } from '../indexDB';
```

Then, The db variable is initialized to `null` and will later hold the **IndexedDB** instance like this:

`let db: IDBDatabase | null = null;`

After, I write a function that fetches data from the API and synchronous with the client database, the `indexDB` with API

```async function syncWithAPI() {
  const { status, body } = await api.getItems();
  if (status === 200) {
    const transaction = db!.transaction(['items'], 'readwrite');
    const store = transaction.objectStore('items');
    await Promise.all(body.map(item => new Promise((resolve, reject) => {
      const request = store.put(item);
      request.onerror = reject;
      request.onsuccess = resolve;
    })));
    return body;
  }
  throw new Error('Failed to fetch items from API');
}
```
Next, I initiated the web worker to fully sync the API functions, store data and retrieve data

```self.onmessage = async (event) => {
  const { type, payload } = event.data;
  
  if (!db) {
    db = await initDB();
  }

  switch (type) {
    case 'SYNC_ITEMS':
      try {
        const items = await syncWithAPI();
        self.postMessage({ type: 'ITEMS_SYNCED', payload: items });
      } catch (error) {
        self.postMessage({ type: 'ERROR', payload: error });
      }
      break;
    case 'ADD_ITEM':
      try {
        const { status, body } = await api.addItem({ body: payload });
        if (status === 201) {
          const transaction = db.transaction(['items'], 'readwrite');
          const store = transaction.objectStore('items');
          const request = store.add(body);
          request.onsuccess = () => {
            self.postMessage({ type: 'ITEM_ADDED', payload: body });
          };
        } else {
          throw new Error('Failed to add item to API');
        }
      } catch (error) {
        self.postMessage({ type: 'ERROR', payload: error });
      }
      break;
    case 'RETRIEVE_ITEMS':
      try {
        const transaction = db.transaction(['items'], 'readonly');
        const store = transaction.objectStore('items');
        const request = store.getAll();
        request.onsuccess = () => {
          self.postMessage({ type: 'ITEMS_RETRIEVED', payload: request.result });
        };
      } catch (error) {
        self.postMessage({ type: 'ERROR', payload: error });
      }
      break;
  }
};
```

This code efficiently manages background synchronization between the IndexedDB and an API using Web Workers. By offloading the synchronization tasks to a worker, the main thread remains free for handling user interactions, ensuring a smooth UI experience. The worker listens for different action types and performs the necessary operations to sync, add, or retrieve data from the database or API. 

## Using `ts rest`

In this project, I used `ts-rest` to manage API requests efficiently. The setup includes defining a `contract` that specifies API endpoints and their structure, creating a client to interact with the API, and a mock server to simulate API responses during development using `fakersjs.` This setup simplifies working with API requests by ensuring strong typing and mock responses, enabling both real and simulated interactions with an API.

The `ts-rest` files is inside `src/lib/ts-rest` and it include:

*  `contract.ts`: Defines the structure of the API.
*  `client.ts`: Configures the API client to interact with the endpoints defined in contract.ts.
*  `mockServer.ts`: Provides mock API responses for development and testing.

**Brief breakdown on how they works**

1. **`src/lib/ts-rest/contract.ts`: Defining the API Contract**

The contract specifies the structure of the API endpoints, including the methods (e.g., GET, POST) and the expected input and output for each endpoint. It acts as a central source of truth for the API, and it ensures type safety and consistency across the project.

```
import { initContract } from '@ts-rest/core';

export const contract = initContract({
  getItems: {
    method: 'GET',
    path: '/items',
    responses: {
      200: z.array(z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      })),
    },
  },
  addItem: {
    method: 'POST',
    path: '/items',
    body: z.object({
      name: z.string(),
      description: z.string(),
    }),
    responses: {
      201: z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
      }),
    },
  },
});
```
2. ** `src/lib/ts-rest/client.ts`: Configuring the API Client**

The `client` uses the contract defined in `src/lib/contract.ts` and connects it to the actual API server. This configuration abstracts away the details of making API requests, allowing the developer to interact with the API through a strongly typed client.

```
import { initClient } from '@ts-rest/core';
import { contract } from './contract.ts';

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});
```
3. **`src/lib/ts-rest/mockServer.ts`: Simulating API Responses**

In the development phase, using a mock server to simulate API responses is essential, especially when the backend is not ready. The mock server is a substitute for the real API, providing dummy data from `fakerjs` based on the `contract`.
```
import express from 'express';
import cors from 'cors';
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import { contract, Item } from './contract';
import { faker } from '@faker-js/faker';

const s = initServer();

let items: Item[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  createdAt: new Date(faker.date.past())
}));

const router = s.router(contract, {
  getItems: async () => {
    return {
      status: 200,
      body: items,
    };
  },
  addItem: async ({ body }) => {
    const newItem: Item = {
      id: items.length + 1,
      ...body,
      createdAt: new Date()
    };
    items.push(newItem);
    return {
      status: 201,
      body: newItem
    };
  }
});

const app = express();
app.use(cors());
app.use(express.json());

createExpressEndpoints(contract, router, app);

const port = 3000;
app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
```

By using `ts-rest`, this project simplifies API development and testing with a consistent contract-based approach. The workflow involves defining the API contract, initializing the client, and setting up a mock server for testing. This approach promotes type safety, modularity, and faster development with mock data.

## Using indexDB

Inside the `lib` directory, we have a `indexDB` folder with a `index.ts` where we write our indexBD functions 

Overview
This function, `initDB()`, is responsible for initializing and upgrading an IndexedDB database. It handles the database creation, upgrading, and sets up an object store for storing items. The function returns a `Promise` that resolves with the database instance (IDBDatabase).

```
export function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MyDatabase', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    };
  });
}
```
*  I Initialized the `IndexedDB` database and set up an item's object store.
*  I have  `Promise` that resolves to an `IDBDatabase` instance if the operation is successful or rejects with an error if something goes wrong.