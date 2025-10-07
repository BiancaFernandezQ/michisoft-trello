export class CardPage {

         constructor(page) {
               this.page = page;

               this.textareaCard= 'list-card-composer-textarea',
               this.agregarCardButton= 'list-add-card-button',
               this.aceptarAgregarCardButton= 'list-card-composer-add-card-button',
               this.list= '[data-testid="list"]',
               this.listCards= '[data-testid="list-cards"]',
               this.cardName= '[data-testid="card-name"]',
               this.tarjetaCreada= 'a[data-testid="card-name"][href^="/c/"]',

            // Modal tarjeta
               this.modalTarjetaCreada= '[data-testid="card-back-name"]',

            // Dentro de Tarjeta :Descripción
               this.descripcionButton= '[data-testid="description-button"]',
               this.descripcionInput= 'div[contenteditable="true"][aria-label="Descripción"]',
               this.descripcionGuardarButton= '[data-testid="description-save-button"]',
               this.descripcionTexto= '[data-testid="click-wrapper"]'
               this.cerrarModalTarjetaIcon = '[data-testid="CloseIcon"]',


               this.commentInput = '[data-testid="comment-input"]';
               this.commentSave = '[data-testid="comment-save-button"]';
               this.commentItemSelector = '.current-comment';
               this.fileInput = 'input[type="file"]';
               this.cardattachmentThumbnailSelector = '.attachment-thumbnail';
               this.guardar_boton = '';

               }

    async obtenerListaPorNombre(nombreLista) {
        return this.page.locator(this.list, { hasText: nombreLista }).first();
    }

    async obtenerTarjetaPorTitulo(listaLocator, tituloCard) {
        return listaLocator.locator(this.tarjetaCreada, { hasText: tituloCard });
    }

    async cerrarTarjetaModal(){
      const cerrarModalButton = this.page.locator(this.cerrarModalTarjetaIcon);
      await cerrarModalButton.waitFor({ state: 'visible' });
      await cerrarModalButton.first().click();
    }

 
    async crearTarjeta(nombreLista, tituloCard) {
        const lista = await this.obtenerListaPorNombre(nombreLista);

        await lista.getByTestId(this.agregarCardButton).click();
        const textarea = lista.getByTestId(this.textareaCard);
        await textarea.waitFor({ state: 'visible' });
        await textarea.fill(tituloCard);

        const agregarBtn = lista.getByTestId(this.aceptarAgregarCardButton);
        await agregarBtn.waitFor({ state: 'visible' });
        await agregarBtn.click();
    }

  
    async abrirTarjetaCreada(nombreLista, tituloCard) {
        const lista = await this.obtenerListaPorNombre(nombreLista);
        const tarjetaCreada = await this.obtenerTarjetaPorTitulo(lista, tituloCard);

        await tarjetaCreada.waitFor({ state: 'visible' });
        await tarjetaCreada.click();

        const modalTarjeta = this.page.locator(this.modalTarjetaCreada);
        await modalTarjeta.waitFor({ state: 'visible' });
        return modalTarjeta;
    }

    async agregarDescripcionATarjeta(nombreLista, tituloCard, descripcion) {
        await this.abrirTarjetaCreada(nombreLista, tituloCard);

        const descripcionButton = this.page.locator(this.descripcionButton);
        await descripcionButton.waitFor({ state: 'visible' });
        await descripcionButton.click();

        const descripcionInput = this.page.locator(this.descripcionInput);
        await descripcionInput.waitFor({ state: 'visible' });

        // Borrar contenido existente y escribir nuevo
        await descripcionInput.click({ clickCount: 3 });
        await descripcionInput.press('Backspace');
        await descripcionInput.type(descripcion);

        const guardarButton = this.page.locator(this.descripcionGuardarButton);
        await guardarButton.waitFor({ state: 'visible' });
        await guardarButton.click();

        const descripcionGuardada = this.page.locator(this.descripcionTexto);
        await descripcionGuardada.waitFor({ state: 'visible' });
        return await descripcionGuardada.textContent();
    }


    async obtenerTituloTarjetaCreada(nombreLista, tituloCard) {
        const lista = await this.obtenerListaPorNombre(nombreLista);
        const tarjetaCreada = lista.locator(this.listCards, { hasText: tituloCard }).first();
        return tarjetaCreada.locator(this.cardName);
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
