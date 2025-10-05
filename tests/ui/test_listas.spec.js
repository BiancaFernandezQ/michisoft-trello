import { expect } from '@playwright/test';
import { test } from '../../fixtures/comb_fixture.js';
import { ListasPage } from '../../pages/listas_page.js';
import { faker } from '@faker-js/faker';
import { open } from 'sqlite'; // Importar open desde sqlite
import sqlite3 from 'sqlite3'; // Importar sqlite3 para usar como driver
import path from 'path';

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

// verificar que el usuario pueda reordenar las listas dentro de un board existente
test('Reordenar listas dentro de un board existente', async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //ToDO: harcodeado
    await page.goto(boardUrl);

    var listasPage = new ListasPage(page);
    await listasPage.crearLista(faker.person.firstName() + ' 1');
    await listasPage.crearLista(faker.person.firstName() + ' 2'); 
    await listasPage.crearLista(faker.person.firstName() + ' 3');
    await listasPage.crearLista(faker.person.firstName() + ' 4');

    await listasPage.moverPrimeraListaAlFinal();
    await listasPage.moverPrimeraListaAlFinal();
    await listasPage.moverPrimeraListaAlFinal();
});

test('Crear lista y mover a tarjeta especifica', async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //ToDo harcodeado
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);

    await listasPage.crearLista('uno');
    await listasPage.crearLista('dos');
    await listasPage.crearLista('tres');
    await listasPage.crearLista('cuatro');
    await listasPage.crearLista('cinco');

    await listasPage.moverListaANuevaPosicion('uno', 'tres');
});


const listas_nombres = require('../../data/listas.json');

test.describe('Crear listas en Trello', () => {
    for (const lista of listas_nombres) {
        test(`regression: Crear lista con nombre: ${lista.nombre}`, async ({ page }) => {
            const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //ToDo harcodeado
            await page.goto(boardUrl);
            
            const listasPage = new ListasPage(page);
            await listasPage.crearLista(lista.nombre);

            if (lista.valido) {
                // Si el caso es válido, la lista debe existir
                expect(await listasPage.existe_en_lista(lista.nombre)).toBeTruthy();
            } else {
                // Si el caso no es válido, la lista no debe existir
                expect(await listasPage.existe_en_lista(lista.nombre)).toBeFalsy();
            }
        });
    }
});

test('Cambiar color de lista', async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; //ToDo harcodeado
    await page.goto(boardUrl);
    const listasPage = new ListasPage(page);
    //leer una lista de sqlite para poder crearla y luego cambiarle el color
    const db = await open({
        filename: path.resolve('data', 'listas_varias.db'),
        driver: sqlite3.Database
    });

    const listas = await db.all('SELECT * FROM listas LIMIT 1');
    await db.close();
    const lista = listas[0];

    await listasPage.crearLista(lista.nombre);
    await listasPage.cambiarColorDeLista(lista.nombre, lista.color);
});