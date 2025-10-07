import { test } from '@playwright/test';
import { CardPage } from '../pages/card_page';
import path from 'path';

const RESOURCES = path.resolve(process.cwd(), 'tests/resources');

test.describe('Card UI - comentarios y adjuntos', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://trello.com/b/0I7SPdDQ/michiiis');  
  });

  test('Añadir y editar comentario en tarjeta', { tag: ['@ui', '@smoke', '@positive'] }, async ({ page }) => {
    const card = new CardPage(page);
    const lista = 'Lista de prueba';
    const tituloCard = 'Tarjeta de prueba card UI';
 
    await card.crearTarjeta(lista, tituloCard);

    await card.abrirTarjetaPorTitulo(tituloCard);

    const textoComentario = `Comentario ${faker.word.noun()} - agregar`;
    await card.agregarComentario(textoComentario);

    const textoEditado = `Comentario ${faker.word.verb()} - editado`;
    await card.editarComentario(textoComentario, textoEditado);

    await card.cerrarTarjeta();
  });

  test('Agregar comentario vacío en tarjeta', { tag: ['@ui', '@negative'] }, async ({ page }) => {
    const card = new CardPage(page);
    const lista = 'Lista de prueba';
    const tituloCard = 'Tarjeta sin comentario';

    await card.crearTarjeta(lista, tituloCard);
    await card.abrirTarjetaPorTitulo(tituloCard);

    const textoComentario = ''; // caso negativo
    await card.agregarComentario(textoComentario);
    });


  test('Adjuntar archivos (png, pdf, txt) a tarjeta',{ tag: ['@ui', '@regression'] }, async ({ page }) => {
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
