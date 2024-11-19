import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  createdAt: z.date()
});

export type Item = z.infer<typeof ItemSchema>;

export const contract = c.router({
  getItems: {
    method: 'GET',
    path: '/items',
    responses: {
      200: z.array(ItemSchema)
    }
  },
  addItem: {
    method: 'POST',
    path: '/items',
    body: ItemSchema.omit({ id: true, createdAt: true }),
    responses: {
      201: ItemSchema
    }
  }
});