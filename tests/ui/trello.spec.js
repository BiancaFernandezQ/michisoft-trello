import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';
import { test } from '../../fixtures/comb_fixture.js';

const jsonPath = path.resolve('data', 'login.json');
const casosInvalidos = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe('Pruebas de Login en Trello', { tag: ['@ui'] } ,() => {

  test('@login @positive @smoke Login válido y guardar sesión', async ({ loginPage, page }) => {
    await loginPage.goToLogin();
    await loginPage.loginuser(process.env.TRELLO_USER);
    await loginPage.loginpass(process.env.TRELLO_PASSWORD);
    await page.waitForURL('**/boards', { timeout: 15000 });

    const sessionPath = path.resolve('data', 'trelloSession.json');
    const state = await page.context().storageState();
    fs.writeFileSync(sessionPath, JSON.stringify(state, null, 2));

    await expect(page).toHaveURL(/.*boards.*/);
  });

  for (const caso of casosInvalidos) {
    const emailprueba = caso.nombre.toLowerCase().includes('email')
    test(`@negative Login inválido - ${caso.nombre}`, async ({ loginPage, page }) => {
      await loginPage.goToLogin();
      await loginPage.loginuser(caso.email);
      await page.waitForTimeout(2000);
      if(emailprueba){
        if (await page.locator('text=Sign up to continue').isVisible()) {
          await expect(page).toHaveURL(/signup/);
          return;
        }

        const emailEmptyErrorLocator = page.locator('#username-uid1-error')
        if (await emailEmptyErrorLocator.isVisible()) {
          await expect(emailEmptyErrorLocator).toContainText(/dirección de correo electrónico|email address/i);
          return;
        }

      }else{
      await loginPage.loginpass(caso.password);
      await page.waitForTimeout(2000);
      const missErrorLocator = page.getByTestId('form-error--content');

        if (await missErrorLocator.isVisible()) {
          await expect(missErrorLocator).toContainText(/correo electrónico o la contraseña son incorrectas|Incorrect/i);
          return;
        }
      
      const passwordErrorLocator = page.locator('[data-testid="password-error-idf-testid"]');
        if (await passwordErrorLocator.isVisible()) {
          await expect(passwordErrorLocator).toContainText(/Indica tu contraseña|Enter your password/i);
          return;
        }}
      await expect(page).not.toHaveURL(/.*boards.*/);
    });
  }
});
