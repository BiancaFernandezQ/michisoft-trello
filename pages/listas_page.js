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
        this.archivar_lista_button = 'button[data-testid="list-actions-archive-list-button"]';
        this.mensajeEmerjente = 'div[role="alert"] span:has-text("Lista archivada")';
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

    async moverListaANuevaPosicion(nombreListaInicial, nombreListaFinal) {
        const listas = this.page.locator(this.listasContainer);
        const botonListaInicial = listas.locator(`button:has(span:has-text("${nombreListaInicial}"))`);
        await expect(botonListaInicial).toBeVisible();

        const botonListaFinal = listas.locator(`button:has(span:has-text("${nombreListaFinal}"))`);
        await expect(botonListaFinal).toBeVisible();

        await botonListaInicial.dragTo(botonListaFinal);
    }

    async listar_las_listas() {
        const listas = await this.page.locator(this.boton_de_lista).allTextContents();
        return listas;
    }

    async existe_en_lista(nombre) {
        const nombreLista = await this.listar_las_listas();
        return nombreLista.includes(nombre);
    }

    async cambiarColorDeLista(nombreLista, colorClase) {
        const listas = this.page.locator(this.listasContainer);
        const botonLista = listas.locator(`button[aria-label="Más acciones en ${nombreLista}"]`);

        await botonLista.click();

        const colorBoton = this.page.locator(`button[data-testid="${colorClase}"]`);
        await colorBoton.click();

        const cerrarMenu = this.page.locator('button[aria-label="Cerrar ventana emergente"]');
        await cerrarMenu.click();
    }

    async verificarColorDeLista(nombreLista) {
        const listas = this.page.locator(this.listasContainer);
        const botonLista = listas.locator(`button[aria-label="Más acciones en ${nombreLista}"]`);

        await botonLista.click();
    }

    async archivarLista(nombreLista) {
        const listas = this.page.locator(this.listasContainer);
        const botonLista = listas.locator(`button[aria-label="Más acciones en ${nombreLista}"]`);

        await botonLista.click();

        const archivarBoton = this.page.locator(this.archivar_lista_button);
        await archivarBoton.click();
    }


    // asegura que una lista exista antes de crearla JH
    async ensureListaExiste(nombreLista) {
        const lista = this.page.locator(`[data-testid="list"] h2:has-text("${nombreLista}")`);
        if (await lista.count() === 0) {
            await this.crearLista(nombreLista);
        }
    }

    // crea las listas base de prueba sin duplicar JH
    async prepararListasBase() {
        await this.ensureListaExiste("Pendiente");
        await this.ensureListaExiste("En Progreso");
    }
}