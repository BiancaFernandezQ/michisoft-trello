import { test, expect, request } from '@playwright/test';
import dotenv from 'dotenv';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';

dotenv.config();

test('Crear una nueva lista en un tablero de Trello', async ({ request }) => {
    const trelloKey = process.env.TRELLO_KEY;
    const trelloToken = process.env.TRELLO_TOKEN;
    const boardId = '68dafe4f28bbf27981d87d40'; 

    const db = await open({
        filename: path.resolve('data', 'listas_varias.db'),
        driver: sqlite3.Database
    });

    const lista = await db.get('SELECT * FROM listas ORDER BY RANDOM() LIMIT 1');
    await db.close();

    const nuevaLista = {
        name: lista.nombre,
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