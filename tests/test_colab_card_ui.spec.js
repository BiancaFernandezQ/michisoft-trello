import { test } from '@playwright/test';
import { CardPage } from '../pages/card_page';
import path from 'path';

const RESOURCES = path.resolve(process.cwd(), 'tests/resources');

test.describe('Card UI - comentarios y adjuntos', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://trello.com/b/0I7SPdDQ/michiiis');  
  });

  test('Añadir y editar comentario en tarjeta', async ({ page }) => {
    const card = new CardPage(page);
    const lista = 'Lista de prueba';
    const tituloCard = 'Tarjeta de prueba card UI';
 
    await card.crearTarjeta(lista, tituloCard);

    await card.abrirTarjetaPorTitulo(tituloCard);

    const textoComentario = 'Comentario de prueba - agregar';
    await card.agregarComentario(textoComentario);
  });

  test('Adjuntar archivos (png, pdf, txt) a tarjeta', async ({ page }) => {
    const card = new CardPage(page);
    const lista = 'Lista de prueba';
    const tituloCard = 'Tarjeta adjuntos card UI';

    await card.crearTarjeta(lista, tituloCard);
    await card.abrirTarjetaPorTitulo(tituloCard);

    await card.adjuntarArchivo(path.join(RESOURCES, 'test-image.png'), 'test-image.png');
    await card.adjuntarArchivo(path.join(RESOURCES, 'test-file.pdf'), 'test-file.pdf');
    await card.adjuntarArchivo(path.join(RESOURCES, 'test-file.txt'), 'test-file.txt');

    await card.cerrarTarjeta();
  });
});
