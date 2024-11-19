import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  addItem: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      // Here you would typically interact with your database
      // For this example, we'll just return the input
      return { success: true, item: input };
    }),
});

export type AppRouter = typeof appRouter;