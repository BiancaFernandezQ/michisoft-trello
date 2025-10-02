import { expect } from '@playwright/test';

export class ListasPage {
    constructor(page) {
        this.page = page;

        this.añadeLista_button1 = 'button[data-testid="list-composer-button"]';
        this.nombreLista_textarea = 'textarea[name="Introduce el nombre de la lista…"]';
        this.añadirLista_button = 'button:has-text("Añadir lista")';
        this.cancelar_button = 'button[aria-label="Cancelar la edición de la lista"]';
        this.listasContainer = '[data-testid="lists"]';
        this.boton_de_lista = 'button._kx6W7TgeWyn4y'; // Btn interno de cada lista
    }

    async crearLista(nombreLista) {
        await this.page.click(this.añadeLista_button1);
        await this.page.fill(this.nombreLista_textarea, nombreLista);
        await this.page.click(this.añadirLista_button);
        await this.page.click(this.cancelar_button);
    }

    async moverPrimeraListaAlFinal() {
        const listas = this.page.locator(this.listasContainer);
        const botonPrimeraLista = listas.locator(this.boton_de_lista).first();
        const botonUltimaLista = listas.locator(this.boton_de_lista).last();

        // Verificar que ambos botones existen
        await expect(botonPrimeraLista).toBeVisible();
        await expect(botonUltimaLista).toBeVisible();

        await botonPrimeraLista.dragTo(botonUltimaLista);

    }
}