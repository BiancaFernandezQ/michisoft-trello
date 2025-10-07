import { expect } from '@playwright/test';
import { test } from '../../fixtures/cards_api_fixtures.js';

test('Crear una tarjeta en una lista de Trello', {tag: ['@api', '@regression'] }, async ({ trelloApi }) => {
  const boardId = '68dafe4f28bbf27981d87d40';
  const listResponse = await trelloApi.createList(boardId, 'Lista para Tarjeta');
  const listBody = await listResponse.json();

  const cardResponse = await trelloApi.createCard(listBody.id, 'Tarjeta de prueba', 'Descripción inicial');
  expect(cardResponse.ok()).toBeTruthy();

  const cardBody = await cardResponse.json();
  expect(cardBody.name).toBe('Tarjeta de prueba');
  expect(cardBody.desc).toBe('Descripción inicial');

  console.log('✅ Tarjeta creada correctamente:', cardBody.name);
});



























// import { test, expect} from '@playwright/test';
// import dotenv from 'dotenv';

// dotenv.config();

// test('Crear una tarjeta en una lista de Trello',{tags:['api','regression','smoke']}, async ({ request }) => {
//     const trelloKey = process.env.TRELLO_KEY;
//     const trelloToken = process.env.TRELLO_TOKEN;
//     const boardId = '68dafe4f28bbf27981d87d40'; 

//     const nuevaLista = {
//         name: 'MichitoSoft',
//         idBoard: boardId,
//         pos: 'top'
//     };

//     const listaResponse = await request.post('https://api.trello.com/1/lists', {
//         params: {
//             key: trelloKey,
//             token: trelloToken,
//             name: nuevaLista.name,
//             idBoard: nuevaLista.idBoard,
//             pos: nuevaLista.pos
//         }
//     });

//        // Lista Creada
//     expect(listaResponse.ok()).toBeTruthy();
   
//     const responseBody = await listaResponse.json();
//     expect(responseBody.name).toBe(nuevaLista.name); // valida nombre de lista
//     expect(responseBody.idBoard).toBe(boardId); // valida id del board
//     console.log('Lista creada..............');


//     const nuevaTarjeta = {
//         name: 'Tarjeta de prueba',
//         des: 'Esta es una tarjeta creada mediante la API de Trello',
//         idList: responseBody.id,
//         pos: 'top'
//     };

//     const tarjetaResponse = await request.post('https://api.trello.com/1/cards', {
//        params: {
//           key:trelloKey,
//           token:trelloToken,
//           tituloCard:nuevaTarjeta.tituloCard,
//           descripcion:nuevaTarjeta.des,
//           idList:nuevaTarjeta.idList,
//           pos:nuevaTarjeta.pos
//        }
//     });

//     // Tarjeta Creada
//     expect(tarjetaResponse.ok()).toBeTruthy();
//     console.log('Tarjeta creada..............');

//     const tarjetaBody = await tarjetaResponse.json();

//     expect(tarjetaBody.tituloCard).toBe(nuevaTarjeta.tituloCard); // valida titulo de la tarjeta
//     expect(tarjetaBody.descripcion).toBe(nuevaTarjeta.descripcion); // valida descripcion de la tarjeta


//     const actualizarDescripcion = await request.put('https://api.trello.com/1/cards/' + (await tarjetaResponse.json()).id, {
//        params: {
//           key:trelloKey,
//           token:trelloToken,
//           nuevaDescripcion:'Descripcion actualizada'
//        }
//     });    

//     // Descripcion de Tarjeta Actualizada correctamente
//     expect(actualizarDescripcion.ok()).toBeTruthy();

//     expect(tarjetaBody.descripcion).toBe(actualizarDescripcion.nuevaDescripcion); // valida descripcion de la tarjeta



//     console.log('Tarjeta actualizada..............');

// });