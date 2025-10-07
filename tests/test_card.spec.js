
import { expect } from "@playwright/test";  
import { ListasPage } from "../pages/listas_page";
import {CardPage} from "../pages/card_page";
import {test} from "../fixtures/comb_fixture";


test.use({ storageState: 'storage/trelloSession.json' });


test.describe.only("Crear Tarjeta en PENDIENTE",()=>{
    let listasPage;
    let tarjeta;
    const boardUrl = 'https://trello.com/b/8Ebu9DmM/prueba';
    const nombreLista = `Pendiente`;
    const tituloCard = "Primera Tarjera"


    test.beforeEach(async({page})=>{
      await page.goto(boardUrl);

      listasPage = new ListasPage(page);
      await listasPage.crearLista(nombreLista);

      tarjeta = new CardPage(page);
      await tarjeta.crearTarjeta(nombreLista, tituloCard);
  
    });


  test("TC01: Verificar que la tarjeta aparezca en la lista",async()=>{
      const listaActual = await tarjeta.obtenerListaPorNombre(nombreLista);
      await expect(listaActual.getByText(tituloCard)).toBeVisible();
      
  });


  test("TC02: Verificar que el titulo de la tarjeta sea visible ",async()=>{
    await expect(await tarjeta.obtenerTituloTarjetaCreada(nombreLista,tituloCard)).toBeVisible();
    
  });

  test("TC03: Verificar que al seleccionar una tarjeta aparezca un modal para ingresar la descripcion",async()=>{
      await tarjeta.clickTarjetaCreada(nombreLista,tituloCard)
     await  expect(await tarjeta.obtenerModalTarjeta(nombreLista,tituloCard)).toBeVisible();
  });


  test("TC04: Validar que una tarjeta seleccionada permita añadir descripcion correctamente",async()=>{
    
  });


});








