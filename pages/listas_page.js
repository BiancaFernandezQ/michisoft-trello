import { expect } from '@playwright/test';
export class ListasPage {
    constructor(page) {
        this.page = page;

        this.añadeLista_button1 = 'button[data-testid="list-composer-button"]';

        this.nombreLista_textarea = 'textarea[name="Introduce el nombre de la lista…"]';
        this.añadirLista_button = 'button:has-text("Añadir lista")';
        this.cancelar_button = 'button[aria-label="Cancelar la edición de la lista"]';

        this.listasContainer = '[data-testid="lists"]' //<ol> </ol>
    }

    async crearLista(nombreLista) {
        await this.page.click(this.añadeLista_button1);
        await this.page.fill(this.nombreLista_textarea, nombreLista);
        await this.page.click(this.añadirLista_button);
        await this.page.click(this.cancelar_button);
    }

    //drag and drop 
    async moverPrimeraListaAlFinal() {
        const listas = this.page.locator(this.listasContainer);
        const primeraLista = listas.locator('li').first();
        const ultimaLista = listas.locator('li').last();

        // // Verificar que ambas listas existen
        // await expect(primeraLista).toBeVisible();
        // await expect(ultimaLista).toBeVisible();

        // // Realizar el drag and drop
        // await primeraLista.dragTo(ultimaLista);

        // console.log('Primera lista movida al final con éxito.');
        await primeraLista.hover();
        await this.page.mouse.down();

    }
}