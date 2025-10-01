import { expect } from '@playwright/test';
import { test } from '../fixtures/comb_fixture.js';
import { ListasPage } from '../pages/listas_page.js';

test.use({ storageState: 'storage/trelloSession.json' });

test('Creación de lista dentro de un board existente', async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //harcodeado
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);
    const nombreLista = `PENDIENTE`;
    await listasPage.crearLista(nombreLista);

    const listasPage2 = new ListasPage(page);
    const nombreLista2 = `EN PROGRESO`;
    await listasPage2.crearLista(nombreLista2);

    console.log(`Lista creada --------: ${nombreLista}`);
    console.log(`Lista creada --------: ${nombreLista2}`);

    await listasPage.moverPrimeraListaAlFinal();
});