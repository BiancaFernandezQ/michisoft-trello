import { expect } from "@playwright/test";  
import {test} from "../fixtures/comb_fixture";


test.use({ storageState: 'data/trelloSession.json' });


test.describe("Crear Tarjeta en PENDIENTE",{tag:'@ui'},()=>{
    const boardUrl = 'https://trello.com/b/8Ebu9DmM/prueba';
    const nombreLista = `Pendiente`;
    const tituloCard = "Primera Tarjeta";

     

    test.beforeEach(async({page,tarjeta,listasPage})=>{
      await page.goto(boardUrl);
      await listasPage.crearLista(nombreLista);
      await tarjeta.crearTarjeta(nombreLista, tituloCard);
  
    });

test("TC01: Verificar que la tarjeta aparezca en la lista",{tag:'@smoke'},async({tarjeta})=>{
    const listaActual = await tarjeta.obtenerListaPorNombre(nombreLista);
    await expect(listaActual.getByText(tituloCard)).toBeVisible();
      
  });


  test("TC02: [@smoke] Verificar que el titulo de la tarjeta sea visible",{tag:['@smoke','@regression']},async({tarjeta})=>{
    await expect(await tarjeta.obtenerTituloTarjetaCreada(nombreLista,tituloCard)).toBeVisible();
    
 });

 test("TC03: Verificar que se pueda abrir correctamente la tarjeta creada",{tag:'@regression'},async({tarjeta})=>{
   await expect(await tarjeta.abrirTarjetaCreada(nombreLista, tituloCard)).toBeVisible();

});

test("TC04: Verificar que se puede ingresar una descripcion a una tarjeta creada",{tag:'@regression'},async({tarjeta})=>{
   const descripcion = "Descripcion de la tarjeta";
   const descripcionGuardada = await tarjeta.agregarDescripcionATarjeta(nombreLista, tituloCard, descripcion);
   expect(descripcionGuardada.trim()).toBe(descripcion);
});

});
