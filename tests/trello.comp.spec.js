import { expect } from '@playwright/test';
import { test } from '../fixtures/comb_fixture.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

test.use({ storageState: 'storage/trelloSession.json' });

test('E2E híbrido: login UI + crear board API + UI + verificación API', async ({ trello, boardPage, page }) => {

  // 1️⃣ Leer 1 board desde SQLite
  const db = await open({
    filename: path.resolve('data', 'boards.db'),
    driver: sqlite3.Database
  });
  const boards = await db.all('SELECT * FROM boards LIMIT 1'); 
  await db.close();

  const board = boards[0];

  const createResponse = await trello.createBoard(board.name, { permissionLevel: board.permissionLevel });
  expect(createResponse.ok()).toBeTruthy();
  const createdBoard = await createResponse.json();
  console.log('Board creado por API:', createdBoard.name, createdBoard.id, createdBoard.url);
  console.log('Respuesta completa de creación de board:', JSON.stringify(createdBoard, null, 2));
  // 4️⃣ Abrir tablero en UI
  await page.goto(createdBoard.url);

  await expect(page.locator(`text=${createdBoard.name}`)).toBeVisible();

  // 5️⃣ Cambiar visibilidad por UI
  await boardPage.changeVisibility();

  // 6️⃣ Marcar como favorito por UI
  await boardPage.markAsFavorite();

  // 7️⃣ Verificar cambios por API
  const updatedResponse = await trello.getBoardById(createdBoard.id);
  expect(updatedResponse.ok()).toBeTruthy();
  const updatedBoard = await updatedResponse.json();
  expect(updatedBoard.prefs.permissionLevel).toBe('public'); 
  console.log('Board verificado por API:', updatedBoard.name, updatedBoard.prefs.permissionLevel);
});
