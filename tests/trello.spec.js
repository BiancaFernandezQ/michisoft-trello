import { test } from '../fixtures/comb_fixture.js';
import fs from 'fs';
import path from 'path';

test('Guardar sesión de Trello (login UI)', async ({ loginPage, page }) => {
  await loginPage.goToLogin();
  await loginPage.login(process.env.TRELLO_USER, process.env.TRELLO_PASSWORD);

  await page.waitForURL('**/boards');

  // Crear carpeta si no existe
  const storageDir = path.resolve('storage');
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir);
  }

  // Guardar cookies + localStorage
  const state = await page.context().storageState();
  fs.writeFileSync(path.join(storageDir, 'trelloSession.json'), JSON.stringify(state));
});
