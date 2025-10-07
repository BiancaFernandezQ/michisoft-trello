import { expect } from '@playwright/test';
import { test } from '../../fixtures/cards_api_fixtures.js';
import { logger } from "../../utils/logger.js";

test('Actualizar la descripción de una tarjeta', { tag: ['@api', '@regression'] }, async ({ trelloApi }) => {
  const boardId = '68e2f762ea73b0cb67f8db0e';
  const listResponse = await trelloApi.createList(boardId, 'Lista Update');

  logger.info('Response de la creación de la lista:');

  const listBody = await listResponse.json();
  logger.info('Lista creada correctamente .......');
  expect(listBody.name).toBe('Lista Update');
  expect( listBody);

  const cardResponse = await trelloApi.createCard(listBody.id, 'Tarjeta Update', 'Descripción vieja');
  logger.info('Tarjeta Creada correctamente...');
  const cardBody = await cardResponse.json();

  const updateResponse = await trelloApi.updateCardDescription(cardBody.id, 'Descripción actualizada');
  logger.info('Response de la actualización de la tarjeta...');
  expect(updateResponse.ok()).toBeTruthy();

  const updated = await updateResponse.json();
  expect(updated.desc).toBe('Descripción actualizada');

  logger.info('Descripción de la tarjeta actualizada correctamente');
});