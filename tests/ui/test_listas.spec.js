import { expect } from '@playwright/test';
import { test } from '../../fixtures/comb_fixture.js';
import { ListasPage } from '../../pages/listas_page.js';
import { faker } from '@faker-js/faker';
import { open } from 'sqlite'; 
import sqlite3 from 'sqlite3'; 
import path from 'path';
import listas_nombres from '../../data/listas.json' assert { type: 'json' };

faker.locale = 'es';

test.use({ storageState: 'data/trelloSession.json' });

test('Creación de lista dentro de un board existente', {tag: ['@smoke', '@positive', '@ui']}, async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; 
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);
    const nombreLista = `PENDIENTE 1`;
    await listasPage.crearLista(nombreLista);
    expect(await listasPage.existe_en_lista(nombreLista)).toBeTruthy();

    const listasPage2 = new ListasPage(page);
    const nombreLista2 = `PROGRESO 2`;
    await listasPage2.crearLista(nombreLista2);
    expect(await listasPage2.existe_en_lista(nombreLista2)).toBeTruthy();

    await listasPage.moverPrimeraListaAlFinal();
});

test('Reordenar listas dentro de un board existente',{tag: ['@regression', '@positive', '@ui']},  async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; 
    await page.goto(boardUrl);

    const lista_re1 = faker.person.firstName() + ' 1';
    const lista_re2 = faker.person.firstName() + ' 2';
    const lista_re3 = faker.person.firstName() + ' 3';
    const lista_re4 = faker.person.firstName() + ' 4';

    var listasPage = new ListasPage(page);

    await listasPage.crearLista(lista_re1);
    await listasPage.crearLista(lista_re2); 
    await listasPage.crearLista(lista_re3);

    expect(await listasPage.existe_en_lista(lista_re1)).toBeTruthy();
    expect(await listasPage.existe_en_lista(lista_re2)).toBeTruthy();
    expect(await listasPage.existe_en_lista(lista_re3)).toBeTruthy();

    await listasPage.moverPrimeraListaAlFinal();
    await listasPage.moverPrimeraListaAlFinal();
});

test('Crear lista y mover a tarjeta especifica', {tag: ['@smoke', '@positive', '@ui']}, async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; 
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);
    var lista_uno = 'uno' + new Date().getTime();
    var lista_dos = 'dos' + new Date().getTime();
    var lista_tres = 'tres' + new Date().getTime();
    var lista_cuatro = 'cuatro' + new Date().getTime();
    var lista_cinco = 'cinco' + new Date().getTime();
    //AUMENTANDO EL date para no crear duplicados
    await listasPage.crearLista(lista_uno);
    await listasPage.crearLista(lista_dos);
    await listasPage.crearLista(lista_tres);
    await listasPage.crearLista(lista_cuatro);
    await listasPage.crearLista(lista_cinco);

    await listasPage.moverListaANuevaPosicion(lista_uno, lista_tres);
});


test.describe('Crear listas en Trello', {tag: ['@regression', '@negative', '@positive', '@ui']}, () => {
    test.beforeEach(async ({ page }) => {
        const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; 
        await page.goto(boardUrl);
    });

    for (const lista of listas_nombres) {
        test(`Crear lista con nombre: ${lista.nombre}`, async ({ page }) => {
            const listasPage = new ListasPage(page);
            await listasPage.crearLista(lista.nombre);

            if (lista.valido) {
                expect(await listasPage.existe_en_lista(lista.nombre)).toBeTruthy();
            } else {
                expect(await listasPage.existe_en_lista(lista.nombre)).toBeFalsy();
            }
        });
    }
});


test('Cambiar color de lista', {tag:['@smoke', '@positive', '@ui']}, async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; 
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);
    const db = await open({
        filename: path.resolve('data', 'listas_varias.db'),
        driver: sqlite3.Database
    });

    const listas = await db.all('SELECT * FROM listas ORDER BY RANDOM() LIMIT 1');
    await db.close();
    const lista = listas[0];

    await listasPage.crearLista(lista.nombre);
    //esperar un poco a que se cree la lista
    await page.waitForTimeout(2000);
    expect(await listasPage.existe_en_lista(lista.nombre)).toBeTruthy();

    await listasPage.cambiarColorDeLista(lista.nombre, lista.color);
    await listasPage.verificarColorDeLista(lista.nombre);
    
    const colorButton = page.locator(`button[data-testid="${lista.color}"]`);
    await expect(colorButton).toHaveAttribute('aria-checked', 'true');
});

test('Archivar Lista', {tag:['@smoke', '@positive', '@ui']}, async ({ page }) => {
    const boardUrl = 'https://trello.com/b/0I7SPdDQ/michiiis'; 
    await page.goto(boardUrl);

    const listasPage = new ListasPage(page);
    const db = await open({
        filename: path.resolve('data', 'listas_varias.db'),
        driver: sqlite3.Database
    });

    const listas = await db.all('SELECT * FROM listas ORDER BY RANDOM() LIMIT 1');
    await db.close();
    const lista = listas[0];

    await listasPage.crearLista(lista.nombre);
    await listasPage.cambiarColorDeLista(lista.nombre, lista.color);
    await listasPage.archivarLista(lista.nombre);

    const mensaje = page.locator(listasPage.mensajeEmerjente);
    await expect(mensaje).toBeVisible();
});