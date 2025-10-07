

export class CardPage {
   constructor(page) {
      this.page = page;
      this.textarea_card = 'list-card-composer-textarea';
      this.agregar_card_button = 'list-add-card-button';
      this.aceptar_agregar_card_button = 'list-card-composer-add-card-button';


      // Dentro de tarjeta
      this.descripcion_tarjeta = '';
      this.commentInput = '[data-testid="comment-input"]';
      this.commentSave = '[data-testid="comment-save-button"]';
      this.commentItemSelector = '.current-comment';
      this.fileInput = 'input[type="file"]';
      this.attachmentThumbnailSelector = '.attachment-thumbnail';
      this.guardar_boton = '';

   }

   async obtenerListaPorNombre(nombreLista) {
      return this.page.locator('[data-testid="list"]', { hasText: nombreLista }).first();
   }


   async crearTarjeta(nombreLista, tituloCard) {
      const lista = await this.obtenerListaPorNombre(nombreLista);
      await lista.getByTestId(this.agregar_card_button).click();

      const textarea = lista.getByTestId(this.textarea_card);
      await textarea.waitFor({ state: 'visible' });
      await textarea.fill(tituloCard);

      const agregarBtn = lista.getByTestId(this.aceptar_agregar_card_button);
      await agregarBtn.waitFor({ state: 'visible' });
      await agregarBtn.click({ trial: false });
   }

   async agregarDescripcion(textoDescripcion) {
      await lista.getByTestId(this.textarea_card).click();


   }


   // Abrir tarjeta por titulo
   async abrirTarjetaPorTitulo(tituloCard) {
      const card = this.page.locator(this.cardTest, { hasText: tituloCard }).first();
      await expect(card).toBeVisible();
      await card.click();
      await this.page.waitForSelector(`[role="${this.cardDialogRole}"]`, { state: 'visible' });
   }

   // Añadir comentario a una tarjeta abierta
   async agregarComentario(textoComentario) {
      await this.page.waitForSelector(this.commentInput, { state: 'visible' });

      const commentBox = this.page.getByTestId(this.commentInput);
      await commentBox.fill(textoComentario);
      const saveBtn = this.page.getByTestId(this.commentSave);
      await saveBtn.click();

      await expect(this.page.locator(`${this.commentItemSelector}:has-text("${textoComentario}")`)).toBeVisible();
   }

   //Editar comentario existente
   async editarComentario(textoAntiguo, textoNuevo) {
      
      const comment = this.page.locator(`${this.commentItemSelector}:has-text("${textoAntiguo}")`).first();
      await expect(comment).toBeVisible();

      await comment.dblclick();
      const editTextarea = comment.locator('textarea');

      if (await editTextarea.count() > 0) {
         await editTextarea.fill(textoNuevo);

         const saveBtn = comment.getByRole('button', { name: 'Guardar' });

         if (await saveBtn.count() > 0) {
            await saveBtn.click();
         } 

         await expect(
            this.page.locator(`${this.commentItemSelector}:has-text("${textoNuevo}")`)
         ).toBeVisible();
         return;
      }
   }


   // Adjuntar archivo (ejemplo imagen) en una tarjeta abierta
   async adjuntarArchivo(rutaArchivo, nombreArchivo) {
      const fileInput = this.page.locator(this.fileInputSelector);
      await fileInput.setInputFiles(rutaArchivo);
      await expect(this.page.locator(`${this.attachmentThumbnailSelector}[title*="${nombreArchivo}"]`)).toBeVisible();
   }

   // Cerrar tarjeta
   async cerrarTarjeta() {
      await this.page.keyboard.press('Escape');
      await this.page.waitForSelector(`[role="${this.cardDialogRole}"]`, { state: 'detached' });
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

   async obtenerTituloTarjetaCreada(nombreLista,tituloCard){
      const lista = await this.obtenerListaPorNombre(nombreLista);
      const tarjetaCreada = lista.locator(this.selectors.listCards, { hasText: tituloCard}).first();
      return tarjetaCreada.locator(this.selectors.cardName);
   }

   /*  async archivarPrimeraTarjeta() {
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
      } */
}