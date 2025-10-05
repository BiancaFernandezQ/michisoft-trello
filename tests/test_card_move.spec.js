import { expect } from "@playwright/test";
import { test } from "../fixtures/comb_fixture.js";
import { ListasPage } from "../pages/listas_page.js";
import { CardPage } from "../pages/card_page.js";

const BOARD_URL = process.env.TRELLO_TEST_BOARD || "https://trello.com/b/MdhBuelQ/j";
const LISTA_PENDIENTE = "Pendiente";
const LISTA_EN_PROGRESO = "En Progreso";

test.use({ storageState: "storage/trelloSession.json" });

test.describe("Movimientos de tarjetas", () => {
  let listasPage;
  let cardPage;

 test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(BOARD_URL);
    listasPage = new ListasPage(page);
    await listasPage.prepararListasBase(); 
    await page.close();
  });


  test.beforeEach(async ({ page }) => {
    await page.goto(BOARD_URL);
    listasPage = new ListasPage(page);
    cardPage = new CardPage(page);
    await listasPage.prepararListasBase();
  });

  test("Verificar que existan las listas base", async () => {
    const listaPendiente = await listasPage.ensureListaExiste(LISTA_PENDIENTE);
    const listaEnProgreso = await listasPage.ensureListaExiste(LISTA_EN_PROGRESO);

    await expect(listaPendiente).not.toBeNull();
    await expect(listaEnProgreso).not.toBeNull();
  });

  test("Crear tarjeta en 'En Progreso' y verificar que existe", async () => {
    const titulo = `Tarjeta en progreso ${Date.now()}`;
    await cardPage.crearTarjeta(LISTA_EN_PROGRESO, titulo);

    const listaEnProgreso = await cardPage.obtenerListaPorNombre(LISTA_EN_PROGRESO);
    await expect(listaEnProgreso.getByText(titulo)).toBeVisible();
  });

  test("Mover tarjeta de 'Pendiente' a 'En Progreso'", async () => {
    const titulo = `Tarjeta para mover ${Date.now()}`;
    await cardPage.crearTarjeta(LISTA_PENDIENTE, titulo);

    await cardPage.moverTarjeta(titulo, LISTA_PENDIENTE, LISTA_EN_PROGRESO);

    const listaDestino = await cardPage.obtenerListaPorNombre(LISTA_EN_PROGRESO);
    await expect(listaDestino.getByText(titulo)).toBeVisible();
  });

  /* test(" Archivar la primera tarjeta de Pendiente", async () => { 
  await cardPage.archivarPrimeraTarjeta(); 
  }); */
});