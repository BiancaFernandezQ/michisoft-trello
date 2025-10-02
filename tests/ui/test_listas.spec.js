import { expect } from '@playwright/test';
import { test } from '../../fixtures/comb_fixture.js';
import { ListasPage } from '../../pages/listas_page.js';
import { faker } from '@faker-js/faker';

faker.locale = 'es';

test.use({ storageState: 'storage/trelloSession.json' });

//Verifica que el usuario pueda crear listas con nombres válidos desde la UI
test('Creación de lista dentro de un board existente', async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //ToDo harcodeado
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);
    const nombreLista = `PENDIENTE 1`;
    await listasPage.crearLista(nombreLista);

    const listasPage2 = new ListasPage(page);
    const nombreLista2 = `PROGRESO 2`;
    await listasPage2.crearLista(nombreLista2);

    await listasPage.moverPrimeraListaAlFinal();
});

//verificar que el usuario pueda reordenar las listas dentro de un board existente
// test('Reordenar listas dentro de un board existente', async ({ page }) => {
//     const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //ToDO: harcodeado
//     await page.goto(boardUrl);

//     var listasPage = new ListasPage(page);
//     await listasPage.crearLista(faker.person.firstName() + ' 1');
//     await listasPage.crearLista(faker.person.firstName() + ' 2'); 
//     await listasPage.crearLista(faker.person.firstName() + ' 3');
//     await listasPage.crearLista(faker.person.firstName() + ' 4');

//     await listasPage.moverPrimeraListaAlFinal();
//     await listasPage.moverPrimeraListaAlFinal();
//     await listasPage.moverPrimeraListaAlFinal();
// });

//