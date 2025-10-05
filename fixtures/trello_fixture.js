import { test as base } from '@playwright/test';
import { TrelloAPI } from '../api/trello_api.js';

export const test = base.extend({
  trello: async ({ request }, use) => {
    const trello = new TrelloAPI(request);
    await use(trello);
  },
});