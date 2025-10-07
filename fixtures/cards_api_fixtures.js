
import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export const test = base.extend({
  trelloApi: async ({ request }, use) => {
    const trello = {
      key: process.env.TRELLO_KEY,
      token: process.env.TRELLO_TOKEN,
      baseUrl: 'https://api.trello.com/1',

      async createList(boardId, name) {
        return await request.post(`${this.baseUrl}/lists`, {
          params: { key: this.key, token: this.token, name, idBoard: boardId, pos: 'top' },
        });
      },

      async createCard(idList, name, des) {
        return await request.post(`${this.baseUrl}/cards`, {
          params: { key: this.key, token: this.token, name, idList, desc: des, pos: 'top' },
        });
      },
      
      async updateCardDescription(cardId, desc) {
        return await request.put(`${this.baseUrl}/cards/${cardId}`, {
          params: { key: this.key, token: this.token, desc },
        });
      },
    };
    await use(trello);
  },
});
