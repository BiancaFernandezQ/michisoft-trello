const { test } = require('@playwright/test');
const { TrelloBoardPage } = require('../pages/board.members.page');
const { generateEmail, generateEmailName } = require('../utils/generateEmail');

test.use({ storageState: 'storage/trelloSession.json' });

test.describe('Automatización Trello - Compartir Tablero', () => {
  test('Agregar miembro y cambiar rol', async ({ page }) => {
    const trello = new TrelloBoardPage(page);

    await trello.openBoard('https://trello.com/b/Lc7kGQ5x/tablero1');

    await trello.clickShare();
    const email = generateEmail();
    const emailName = generateEmailName();
    console.log(`Correo generado: ${email}`);
    console.log(`Nombre parcial: ${emailName}`);

    await trello.addMember(email);

    await trello.changeRole(emailName, 'Observador');
  });
});
