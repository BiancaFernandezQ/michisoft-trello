import { expect } from '@playwright/test';
import { test } from '../fixtures/comb_fixture.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { faker } from '@faker-js/faker';
import { ListasPage } from '../pages/listas_page.js';
import { CardPage } from '../pages/card_page.js';
import { TrelloBoardPage } from '../pages/board.members.page.js';
import { generateEmail, generateEmailName } from '../utils/generateEmail.js';
import { logger } from "../utils/logger.js";
import { log } from 'console';
import { HomePage } from '../pages/home.page.js';



test.use({ storageState: 'data/trelloSession.json' });
logger.info('Inicializando Ejecucion del Test Cases Flujo ');

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
     logger.info('Board creado por API.....');
    //console.log('Board creado por API:', createdBoard.name, createdBoard.id, createdBoard.url); //! TODO ARREGALR CARO

    await page.goto(createdBoard.url);

    await expect(page.locator(`text=${createdBoard.name}`)).toBeVisible();

    await boardPage.changeVisibility();

    await boardPage.markAsFavorite();

    const updatedResponse = await trello.getBoardById(createdBoard.id);
    expect(updatedResponse.ok()).toBeTruthy();
    const updatedBoard = await updatedResponse.json();
    expect(updatedBoard.prefs.permissionLevel).toBe('org');


    //console.log('Board verificado por API:', updatedBoard.name, updatedBoard.prefs.permissionLevel);
    logger.info('Board verificado por API........');

    //!listas
    const listasPage = new ListasPage(page);
    const db2 = await open({
        filename: path.resolve('data', 'listas_varias.db'),
        driver: sqlite3.Database
    });

    const listas = await db2.all('SELECT * FROM listas ORDER BY RANDOM() LIMIT 5');
    await db2.close();
    const lista = listas[0];
    const lista2 = listas[1];
    const lista3 = listas[2];

    const nombreLista = lista.nombre;
    logger.info('Creando Lista........');
    await listasPage.crearLista(lista.nombre);
    await listasPage.crearLista(lista2.nombre);
    await listasPage.crearLista(lista3.nombre);
    logger.info('lista creada........');
    expect(await listasPage.existe_en_lista(nombreLista)).toBeTruthy();

    await listasPage.moverPrimeraListaAlFinal();
    logger.info('Lista cambiuo de posicion........');

    await listasPage.cambiarColorDeLista(nombreLista, lista.color); 
    await listasPage.cambiarColorDeLista(lista2.nombre, lista2.color);
    await listasPage.cambiarColorDeLista(lista3.nombre, lista3.color);
    logger.info('Lista cambiada de color........');

    await listasPage.archivarLista(lista3.nombre);
    logger.info('Lista archivada........');
    const mensaje = page.locator(listasPage.mensajeEmerjente);
    await expect(mensaje).toBeVisible();

    //!               CARD DANI
    const tituloCard = "Primera Tarjera" //!TODO NO HARCODEAR DANI
    let tarjeta = new CardPage(page);
    await tarjeta.crearTarjeta(nombreLista, tituloCard);
    const listaActual = await tarjeta.obtenerListaPorNombre(nombreLista);

    // Verificar tarjeta en Lista
    await expect(listaActual.getByText(tituloCard)).toBeVisible();
   // console.log('Card creada en UI:', tituloCard);
    logger.info('Card creada en UI.......');


    // Verificar titulo de tarjeta sea visible
    await expect(await tarjeta.obtenerTituloTarjetaCreada(nombreLista,tituloCard)).toBeVisible();
    // console.log('Titulo de Tarjeta Creada es visible:', tituloCard);
    logger.info('Titulo de Tarjeta Creada es visible.....');

    // Verificar abrir tarjeta creada correctamente
     await expect(await tarjeta.abrirTarjetaCreada(nombreLista, tituloCard)).toBeVisible();
    //console.log('Tarjeta abierta correctamente:', tituloCard);
    logger.info('Tarjeta abierta correctamente......');

    await tarjeta.cerrarTarjetaModal();
    //console.log('Tarjeta cerrada correctamente:', tituloCard);
    logger.info('Tarjeta cerrada correctamente......');

    // Verificar agregar descripcion a tarjeta creada
    const descripcion = "Descripcion de la tarjeta";
    const descripcionGuardada = await tarjeta.agregarDescripcionATarjeta(nombreLista, tituloCard, descripcion);
    expect(descripcionGuardada.trim()).toBe(descripcion);
    console.log('Descripcion agregada a la tarjeta:', descripcionGuardada);
    logger.info('Descripcion agregada a la tarjeta........');
    
    await tarjeta.cerrarPrueba();

    const trello_share = new TrelloBoardPage(page);
    await trello_share.clickShare();
    const email = generateEmail();
    const emailName = generateEmailName();
    console.log(`Correo generado: ${email}`);
    console.log(`Nombre parcial: ${emailName}`);
   // console.log('Descripcion agregada a la tarjeta:', descripcionGuardada);
    logger.info('Descripcion agregada a la tarjeta....');




   
    //!cerrar tarjeta JHESS

    
    //! share
    // const trello_share = new TrelloBoardPage(page);
    // await trello_share.clickShare();
    // const email = generateEmail();
    // const emailName = generateEmailName();
    // console.log(`Correo generado: ${email}`);
    // console.log(`Nombre parcial: ${emailName}`);

    await trello_share.addMember(email);
    logger.info('Miembro añadido ........');

    await trello_share.changeRole(emailName, 'Observador');
    // await this.page.locator('[data-testid="board-invite-modal-close-button"]').click();
    logger.info('Modificar Rol........');

    await trello_share.removeMember(emailName); 
    logger.info('Eliminar Miembro........');

    //!colab card
    // await tarjeta.abrirTarjetaPorTitulo(tituloCard); //!ARREGLAR LOCATORS GUADA - 
    // const textoComentario = 'Comentario de prueba - agregar'; //!TODO NO HARCODEAR GUADA
    // await tarjeta.agregarComentario(textoComentario);

    // const textoEditado = 'Comentario automatizado - editado'; //!TODO NO HARCODEAR GUADA
    // await tarjeta.editarComentario(textoComentario, textoEditado);

    // await tarjeta.cerrarTarjeta();

    //!mover tarjeta
    // const LISTA_PENDIENTE = `Pendiente-${faker.word.noun()}-${Date.now()}`;
    // const LISTA_EN_PROGRESO = `En Progreso-${faker.word.noun()}-${Date.now()}`;
    // const listaPendiente = await listasPage.ensureListaExiste(lista);
    // const listaEnProgreso = await listasPage.ensureListaExiste(lista2);
    const titulo_cardj = `Tarjeta en progreso ${faker.word.noun()}-${Date.now()}`;
    await tarjeta.crearTarjeta(lista.nombre, titulo_cardj);
    logger.info('Crear tarjeta........');
    await tarjeta.moverTarjeta(titulo_cardj,lista.nombre, lista2.nombre);
    logger.info('Mover tarjeta........');
    
    //!eliminar board
    await boardPage.home();
    //tiempo
    await page.waitForTimeout(2000);
    const deletedBoard = await trello.deleteBoard(createdBoard.id);
    console.log('Tablero eliminado por API:', createdBoard.name);
    logger.info('Eliminar Tablero........');

    //!logout
    expect(deletedBoard.ok()).toBeTruthy();
    const homePage = new HomePage(page);
    await homePage.logout();
    logger.info('Logout........');
});