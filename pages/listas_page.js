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
        /**
         * <button type="button" data-testid="list-edit-menu-button" aria-haspopup="true" aria-label="Más acciones en PROGRESO 2"><span class="nch-icon"><span data-testid="OverflowMenuHorizontalIcon" data-vc="icon-OverflowMenuHorizontalIcon" aria-hidden="true" class="_1trkwc43" style="--icon-primary-color: currentColor; --icon-secondary-color: inherit;"><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 14C6.10457 14 7 13.104621 12Z" fill="currentColor"></path></svg></span></span></button>
         */
        //buscar o dar click en el boton de la lista aria-label="Más acciones en nombreLista"
        const listas = this.page.locator(this.listasContainer);
        const botonLista = listas.locator(`button[aria-label="Más acciones en ${nombreLista}"]`);
        //click en el boton
        await botonLista.click();
        /**
         * <li class="CN2trtwQqgYiNl" data-testid="tile-container"><button class="zzAcsDqvFnUJt7 RZ3Y2QdAWn2KI7 color-blind-pattern-green ybVBgfOiuWZJtD _St8_YSRMkLv07" type="button" data-testid="color-tile-green" aria-label="verde" aria-checked="false" role="radio"></button></li>
         */
        //usaremos el data-testid="colorClase" y le daremos click
        const colorBoton = this.page.locator(`button[data-testid="${colorClase}"]`);
        await colorBoton.click();

        const cerrarMenu = this.page.locator('button[aria-label="Cerrar ventana emergente"]');
        await cerrarMenu.click();
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