import { expect } from '@playwright/test';
import { test } from '../../fixtures/cards_api_fixtures.js';
import { logger } from "../../utils/logger.js";

test('Crear una tarjeta en una lista de Trello', {tag: ['@api', '@regression'] }, async ({ trelloApi }) => {
  const boardId = '68e2f762ea73b0cb67f8db0e';
  const listResponse = await trelloApi.createList(boardId, 'Lista para Tarjeta');
  const listBody = await listResponse.json();
  //logger.debug('Creando lista...',listBody.text());

  const cardResponse = await trelloApi.createCard(listBody.id, 'Tarjeta de prueba', 'Descripción inicial');
  expect(cardResponse.ok()).toBeTruthy();
 

  const cardBody = await cardResponse.json();
   logger.info('Creando tarjeta...');
  expect(cardBody.name).toBe('Tarjeta de prueba');
  expect(cardBody.desc).toBe('Descripción inicial');

  logger.info('Tarjeta creada correctamente:');
  
});




























