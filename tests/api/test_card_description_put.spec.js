import { expect } from '@playwright/test';
import { test } from '../../fixtures/cards_api_fixtures.js';

test('Actualizar la descripción de una tarjeta', { tag: ['@api', '@regression'] }, async ({ trelloApi }) => {
  const boardId = '68dafe4f28bbf27981d87d40';
  const listResponse = await trelloApi.createList(boardId, 'Lista Update');
  const listBody = await listResponse.json();

  const cardResponse = await trelloApi.createCard(listBody.id, 'Tarjeta Update', 'Descripción vieja');
  const cardBody = await cardResponse.json();

  const updateResponse = await trelloApi.updateCardDescription(cardBody.id, 'Descripción actualizada');
  expect(updateResponse.ok()).toBeTruthy();

  const updated = await updateResponse.json();
  expect(updated.desc).toBe('Descripción actualizada');

  console.log('✅ Tarjeta actualizada correctamente:', updated.name);
});
