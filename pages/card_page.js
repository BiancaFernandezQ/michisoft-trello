import { expect } from "@playwright/test";

 export class CardPage{
    constructor(page){
       this.page = page;
       this.textarea_card = 'list-card-composer-textarea';
       this.agregar_card_button = 'list-add-card-button'; 
       this.aceptar_agregar_card_button = 'list-card-composer-add-card-button';
       

       // Dentro de tarjeta
       this.descripcion_tarjeta = '';
       this.guardar_boton = '';

    }

    async obtenerListaPorNombre(nombreLista) {
       return this.page.locator('[data-testid="list"]', { hasText: nombreLista }).first();
    }


    async crearTarjeta(nombreLista , tituloCard){
      const lista = await this.obtenerListaPorNombre(nombreLista);
      await lista.getByTestId(this.agregar_card_button).click(); 

      const textarea = lista.getByTestId(this.textarea_card);
      await textarea.waitFor({ state: 'visible' }); 
      await textarea.fill(tituloCard);              

      const agregarBtn = lista.getByTestId(this.aceptar_agregar_card_button);
      await agregarBtn.waitFor({ state: 'visible' });
      await agregarBtn.click({ trial: false }); 
    }

    async agregarDescripcion(textoDescripcion){
      await lista.getByTestId(this.textarea_card).click();
      

    }

   




}