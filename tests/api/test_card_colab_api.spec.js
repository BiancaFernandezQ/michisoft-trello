import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test.describe('API Trello - Crear Card y validar attachments y comments', () => {
  const baseUrl = 'https://api.trello.com/1';
  const trelloKey = process.env.TRELLO_KEY;
  const trelloToken = process.env.TRELLO_TOKEN;
  const boardId = '68dafe4f28bbf27981d87d40'; 

  let listId;
  let cardId;

  test('Crear lista temporal para card',{ tag: ['@api', '@smoke', '@positive'] }, async ({ request }) => {
    const response = await request.post(`${baseUrl}/lists`, {
      params: {
        key: trelloKey,
        token: trelloToken,
        idBoard: boardId,
        name: 'Lista API - Temporal',
        pos: 'top',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    listId = body.id;

    console.log('Lista creada:', body.name);
    expect(body.idBoard).toBe(boardId);
  });

  test('Crear card dentro de la lista',{ tag: ['@api', '@regression', '@positive'] }, async ({ request }) => {
    const response = await request.post(`${baseUrl}/cards`, {
      params: {
        key: trelloKey,
        token: trelloToken,
        idList: listId,
        name: 'Card API - Test',
        desc: 'Descripción de prueba automatizada',
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    cardId = body.id;

    console.log('Card creada:', body.name);
    expect(body.name).toBe('Card API - Test');
  });

  test('Agregar attachment a la card',{ tag: ['@api', '@regression', '@positive'] }, async ({ request }) => {
    const attachmentData = {
      url: 'https://example.com/file.txt',
      name: 'Archivo ejemplo',
    };

    const response = await request.post(`${baseUrl}/cards/${cardId}/attachments`, {
      params: {
        key: trelloKey,
        token: trelloToken,
        url: attachmentData.url,
        name: attachmentData.name,
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('Attachment agregado:', body.name);

    expect(body.url).toBe(attachmentData.url);
    expect(body.name).toBe(attachmentData.name);
  });

  test('Agregar comentario a la card',{ tag: ['@api', '@regression', '@positive'] }, async ({ request }) => {
    const commentText = 'Comentario agregado por Playwright API Test';

    const response = await request.post(`${baseUrl}/cards/${cardId}/actions/comments`, {
      params: {
        key: trelloKey,
        token: trelloToken,
        text: commentText,
      },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    console.log('Comentario agregado:', body.data.text);

    expect(body.data.text).toBe(commentText);
  });
});

