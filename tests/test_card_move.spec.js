import { expect } from "@playwright/test";
import { test } from "../fixtures/comb_fixture.js";
import { ListasPage } from "../pages/listas_page.js";
import { CardPage } from "../pages/card_page.js";

test.use({ storageState: "storage/trelloSession.json" });

test.describe("Movimientos de tarjetas", () => {
  let listasPage;
  let cardPage;

  test.beforeEach(async ({ page }) => {
    const boardUrl = process.env.TRELLO_TEST_BOARD || "https://trello.com/b/8Ebu9DmM/prueba";
    await page.goto(boardUrl);

    listasPage = new ListasPage(page);
    cardPage = new CardPage(page);

    // Prepara listas base antes de cada test
    await listasPage.prepararListasBase();
  });

  // TC 1 - Mover tarjeta de Pendiente a En Progreso
  test("Mover tarjeta de Pendiente a En Progreso", async () => {
    const titulo = `Tarjeta para mover ${Date.now()}`;

    // Crear tarjeta en Pendiente
    await cardPage.crearTarjeta("Pendiente", titulo);

    // Moverla a En Progreso
    await cardPage.moverTarjeta(titulo, "Pendiente", "En Progreso");

    // Verificar que está en la lista destino
    const listaDestino = await cardPage.obtenerListaPorNombre("En Progreso");
    await expect(listaDestino.getByText(titulo)).toBeVisible();
  });

  // TC 2 - Archivar la primera tarjeta en Pendiente
  test("Archivar la primera tarjeta de Pendiente", async () => {
    await cardPage.archivarPrimeraTarjeta();
  });
});
