import { expect } from "@playwright/test";

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
}