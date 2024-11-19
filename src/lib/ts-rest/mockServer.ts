import express from 'express';
import cors from 'cors';
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import { contract, Item } from './contract.ts';
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