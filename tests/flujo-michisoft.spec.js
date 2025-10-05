import { expect } from '@playwright/test';
import { test } from '../fixtures/comb_fixture.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { faker } from '@faker-js/faker';
import { ListasPage } from '../pages/listas_page.js';
import { CardPage } from '../pages/card_page.js';

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

    const createResponse = await trello.createBoard(board.name, { permissionLevel: board.permissionLevel, defaultLists: false });
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

    const listasPage = new ListasPage(page);
    const nombreLista = `PENDIENTE 1`; //!TODO NO HARCODEAR BIANCA
    await listasPage.crearLista(nombreLista);

    const listasPage2 = new ListasPage(page);
    const nombreLista2 = `PROGRESO 2`; //!TODO NO HARCODEAR BIANCA
    await listasPage2.crearLista(nombreLista2);

    await listasPage.moverPrimeraListaAlFinal();
    await listasPage.cambiarColorDeLista(nombreLista2, 'color-tile-green'); //!TODO NO HARCODEAR BIANCA


    //!card
    const tituloCard = "Primera Tarjera" //!TODO NO HARCODEAR DANI
    let tarjeta = new CardPage(page);
    await tarjeta.crearTarjeta(nombreLista, tituloCard);
    const listaActual = await tarjeta.obtenerListaPorNombre(nombreLista);
    await expect(listaActual.getByText(tituloCard)).toBeVisible();
    //await expect(await tarjeta.obtenerTituloTarjetaCreada(nombreLista,tituloCard)).toBeVisible(); //!TODO revisar Dani
    const cardId = await trello.getCardByName(createdBoard.id, tituloCard);
    console.log('Card encontrada por API:', tituloCard, cardId);

    const nuevaDescripcion = "Descripción actualizada por API desde el flujo híbrido ✅";  //!TODO NO HARCODEAR DANI
    const updateResponse = await trello.updateCardDescription(cardId, nuevaDescripcion);
    expect(updateResponse.ok()).toBeTruthy();

    
});
