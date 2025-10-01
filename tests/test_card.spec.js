
import { expect } from "@playwright/test";  

import { ListasPage } from "../pages/listas_page";
import {CardPage} from "../pages/card_page";
import {test} from "../fixtures/comb_fixture";




test.use({ storageState: 'storage/trelloSession.json' });


test.only("Verificar crear tarjeta en pendiente",async({page})=>{
  
  const boardUrl = 'https://trello.com/b/8Ebu9DmM/prueba';
  await page.goto(boardUrl);
  const listasPage = new ListasPage(page);
  const nombreLista = `Pendiente`;
  await listasPage.crearLista(nombreLista);


  const tarjeta = new CardPage(page);
  const tituloCard = "Primera Tarjera"
  await tarjeta.crearTarjeta(nombreLista , tituloCard);
  const listaActual = await tarjeta.obtenerListaPorNombre(nombreLista);

  //verificar que la tarjeta aparece en la lista
  await expect(listaActual.getByText(tituloCard)).toBeVisible({ timeout: 10000 });
 
});




