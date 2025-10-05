import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Crear una nueva lista en un tablero de Trello', async ({ request }) => {
    const trelloKey = process.env.TRELLO_KEY;
    const trelloToken = process.env.TRELLO_TOKEN;
    const boardId = '68dafe4f28bbf27981d87d40'; 

    const nuevaLista = {
        name: 'Lista de prueba',
        idBoard: boardId,
        pos: 'top'
    };

    const response = await request.post('https://api.trello.com/1/lists', {
        params: {
            key: trelloKey,
            token: trelloToken,
            name: nuevaLista.name,
            idBoard: nuevaLista.idBoard,
            pos: nuevaLista.pos
        }
    });

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody.name).toBe(nuevaLista.name);
    expect(responseBody.idBoard).toBe(boardId);

    console.log('Lista creada:', responseBody);
});