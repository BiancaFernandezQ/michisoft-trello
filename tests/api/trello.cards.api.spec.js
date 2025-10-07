import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Trello Cards API', { tag: ['@api', '@regression'] }, () => {

  test('Mover una tarjeta a otra lista @api @regression', async ({ request }) => {
    const trelloKey = process.env.TRELLO_KEY;
    const trelloToken = process.env.TRELLO_TOKEN;
    const cardId = process.env.TRELLO_CARD_ID;   
    const newListId = process.env.TRELLO_NEW_LIST_ID; 
    const response = await request.put(`https://api.trello.com/1/cards/${cardId}`, {
      params: {
        key: trelloKey,
        token: trelloToken,
        idList: newListId,
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    expect(responseBody.idList).toBe(newListId);
    console.log('Tarjeta movida correctamente:', responseBody);
  });

  test('Archivar una tarjeta existente @api @regression', async ({ request }) => {
    const trelloKey = process.env.TRELLO_KEY;
    const trelloToken = process.env.TRELLO_TOKEN;
    const cardId = process.env.TRELLO_CARD_ID; 

    const response = await request.put(`https://api.trello.com/1/cards/${cardId}/closed`, {
      params: {
        key: trelloKey,
        token: trelloToken,
        value: true,
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();

    expect(responseBody.closed).toBeTruthy();
    console.log('Tarjeta archivada correctamente:', responseBody);
  });

});
