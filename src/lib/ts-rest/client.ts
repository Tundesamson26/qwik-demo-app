import { initClient } from '@ts-rest/core';
import { contract } from './contract.ts';

export const client = initClient(contract, {
  baseUrl: 'http://localhost:3000',
  baseHeaders: {},
});