import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { BoardPage } from '../pages/board.page';
import { ListasPage } from '../pages/listas_page';
import { CardPage } from '../pages/card_page';
import { TrelloAPI } from '../api/trello_api';
import * as dotenv from 'dotenv';
dotenv.config();

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  trello: async ({ request }, use) => {
    await use(new TrelloAPI(request));
  },
  listasPage: async ({ page }, use) => {
    await use(new ListasPage(page));
  },
  tarjeta: async ({ page }, use) => {
    await use(new CardPage(page));
  },
});