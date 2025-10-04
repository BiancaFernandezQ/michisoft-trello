import { expect } from '@playwright/test';
import { test } from '../fixtures/comb_fixture.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { faker } from '@faker-js/faker';

test.use({ storageState: 'data/trelloSession.json' });

test('E2E híbrido', async ({ trello, boardPage, page }) => {

  const db = await open({
    filename: path.resolve('data', 'boards.db'),
    driver: sqlite3.Database
  });
  const boards = await db.all('SELECT * FROM boards LIMIT 1'); 
  await db.close();
  const randomIndex = faker.number.int({ min: 0, max: boards.length - 1 });

  const board = boards[randomIndex];

  const createResponse = await trello.createBoard(board.name, { permissionLevel: board.permissionLevel, defaultLists: false});
  expect(createResponse.ok()).toBeTruthy();
  const createdBoard = await createResponse.json();
  console.log('Board creado por API:', createdBoard.name, createdBoard.id, createdBoard.url);
  
  await page.goto(createdBoard.url);

  await expect(page.locator(`text=${createdBoard.name}`)).toBeVisible();

  await boardPage.changeVisibility();

  await boardPage.markAsFavorite();

  const updatedResponse = await trello.getBoardById(createdBoard.id);
  expect(updatedResponse.ok()).toBeTruthy();
  const updatedBoard = await updatedResponse.json();
  expect(updatedBoard.prefs.permissionLevel).toBe('org'); 
  console.log('Board verificado por API:', updatedBoard.name, updatedBoard.prefs.permissionLevel);
});
