import { test, expect } from '@playwright/test';
import { TrelloBoardPage } from '../pages/board.members.page.js';
const { generateEmail, generateEmailName } = require('../utils/generateEmail');

test.use({ storageState: 'storage/trelloSession.json' });

test.describe('Automatización Trello - Compartir Tablero', () => {
  test('Agregar miembro y cambiar rol', async ({ page }) => {
    test.info().annotations.push({ type: 'tag', description: '@api' });
    test.info().annotations.push({ type: 'tag', description: '@positivo' });
    test.info().annotations.push({ type: 'tag', description: '@fucional' });
    const trello = new TrelloBoardPage(page);

    await trello.openBoard('https://trello.com/b/Lc7kGQ5x/tablero1');

    await trello.clickShare();
    const email = generateEmail();
    const emailName = generateEmailName();
    console.log(`Correo generado: ${email}`);
    console.log(`Nombre parcial: ${emailName}`);

    await trello.addMember(email);

    await trello.changeRole(emailName, 'Observador');
    //no funcionó eliminar miembro
    //await trello.removeMember(emailName); 
  });
});
