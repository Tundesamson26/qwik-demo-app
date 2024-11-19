import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './lib/trpc/server.ts';

const app = express();
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});