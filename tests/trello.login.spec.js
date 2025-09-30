import { expect } from '@playwright/test';
import { test } from '../fixtures/trello_fixture.js';

test('GET /members/{id}/boards devuelve tableros', async ({ trello }) => {
  const response = await trello.getBoards();
  expect(response.ok()).toBeTruthy();

  const boards = await response.json();
  console.log('Tableros encontrados:', boards.map(b => b.name));

  expect(Array.isArray(boards)).toBeTruthy();
  expect(boards.length).toBeGreaterThan(0);
});
