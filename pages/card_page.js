

 export class CardPage{
    constructor(page){
       this.page = page;
       this.textarea_card = 'list-card-composer-textarea';
       this.agregar_card_button = 'list-add-card-button'; 
       this.aceptar_agregar_card_button = 'list-card-composer-add-card-button';
       
       // Dentro de tarjeta
       this.modal_tarjeta = '[data-testid="card-back-name"]';
       this.descripcion_tarjeta_input = 'description-button';
       this.descripcion_tarjeta ='editor-content-container';
       this.guardar_button = 'description-save-button';  
       


       this.selectors={
          list:'[data-testid="list"]',
          listCards:'data-testid="list-cards"]',
          cardName:'[data-testid="card-name"]'
       };
    }

    async obtenerListaPorNombre(nombreLista) {
       return this.page.locator(this.selectors.list, { hasText: nombreLista }).first();
    }


    async obtenerModalTarjeta(nombreLista,tituloCard){
      const lista = await this.obtenerListaPorNombre(nombreLista);
      const tarjetaCreada = lista.locator(this.selectors.listCards, { hasText: tituloCard}).first();
      return tarjetaCreada.locator(this.modal_tarjeta);
    }

     async clickTarjetaCreada(nombreLista,tituloCard){
      const lista = await this.obtenerListaPorNombre(nombreLista);
      const tarjeta = lista.locator(this.selectors.listCards, { hasText: tituloCard }).first();
      await tarjeta.waitFor({ state: 'visible' });
      await tarjeta.click();
   }

    async obtenerTituloTarjetaCreada(nombreLista,tituloCard){
      const lista = await this.obtenerListaPorNombre(nombreLista);
      const tarjetaCreada = lista.locator(this.selectors.listCards, { hasText: tituloCard}).first();
      return tarjetaCreada.locator(this.selectors.cardName);
    }

    
    async crearTarjeta(nombreLista , tituloCard){
      const lista = await this.obtenerListaPorNombre(nombreLista);
      await lista.getByTestId(this.agregar_card_button).click(); 

      const textarea = lista.getByTestId(this.textarea_card);
      await textarea.waitFor({ state: 'visible' }); 
      await textarea.fill(tituloCard);              

      const agregarBtn = lista.getByTestId(this.aceptar_agregar_card_button);
      await agregarBtn.waitFor({ state: 'visible' });
      await agregarBtn.click(); 
    }


a
  

   


    

   




}