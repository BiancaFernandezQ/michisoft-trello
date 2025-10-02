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

   async moverTarjeta(tituloCard, listaOrigen, listaDestino) {
    const origen = await this.obtenerListaPorNombre(listaOrigen);
    const destino = await this.obtenerListaPorNombre(listaDestino);

    const card = origen.locator(`[data-testid="trello-card"] >> text=${tituloCard}`);
    await expect(card).toBeVisible();

    const dropZone = destino.locator('[data-testid="list-cards"]');

    // Drag and drop
    await card.dragTo(dropZone);
  }
    // Archivar la primera tarjeta encontrada en el tablero
  async archivarPrimeraTarjeta() {
    const firstCard = this.page.locator('[data-testid="trello-card"]').first();
    await expect(firstCard).toBeVisible();

    const titulo = await firstCard.innerText();
    await firstCard.click();

    const cardDialog = this.page.getByRole("dialog", { name: titulo });
    await expect(cardDialog).toBeVisible();

    const menuBtn = cardDialog.getByRole("button", { name: "Acciones" });
    await expect(menuBtn).toBeVisible({ timeout: 5000 });
    await menuBtn.click();

    const archivarBtn = this.page.getByRole("button", { name: "Archivar" });
    await expect(archivarBtn).toBeVisible({ timeout: 5000 });
    await archivarBtn.click();

    // Cierra modal
    await this.page.keyboard.press("Escape");

    // Verifica que ya no esté visible en el tablero (no en el modal)
    const boardCard = this.page.locator('[data-testid="trello-card"]').filter({ hasText: titulo });
    await expect(boardCard).not.toBeVisible({ timeout: 5000 });
   }
  }