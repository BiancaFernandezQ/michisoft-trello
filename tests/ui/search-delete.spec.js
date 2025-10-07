import { test, expect, request } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

test.describe('Search + Delete Board + Logout [@ui][@api][@search][@delete][@logout]', () => {
  
  test('Search card by name, delete board and logout', async ({ page, request }) => {
    
  
    await page.goto('https://trello.com/login');
    await page.fill('#user', process.env.TRELLO_USER);
    await page.click('#login');
    await page.waitForSelector('#password');
    await page.fill('#password', process.env.TRELLO_PASSWORD);
    await page.click('#login-submit');
    await page.waitForURL(/https:\/\/trello\.com/);
    console.log('✅ Login successful');

   
    await page.locator('[data-testid="header-search-input"]').fill('card');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(4000);

    const results = await page.locator('.list-card-title').allTextContents();
    console.log('🔍 Search results:', results);

   
    const searchUrl = `https://api.trello.com/1/search?query=card&key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
    const response = await request.get(searchUrl);
    expect(response.ok()).toBeTruthy();
    const searchData = await response.json();
    expect(searchData.cards.length).toBeGreaterThan(0);
    console.log(`✅ Found ${searchData.cards.length} cards via API`);

   
    const boardId = searchData.boards[0]?.id;
    if (boardId) {
      const deleteUrl = `https://api.trello.com/1/boards/${boardId}?key=${process.env.TRELLO_KEY}&token=${process.env.TRELLO_TOKEN}`;
      const deleteResponse = await request.delete(deleteUrl);
      expect(deleteResponse.ok()).toBeTruthy();
      console.log(`🗑️ Board ${boardId} deleted successfully`);
    } else {
      console.log('⚠️ No boards found to delete');
    }

  
    await page.waitForSelector('[data-testid="header-member-menu-button"]');
    await page.click('[data-testid="header-member-menu-button"]');
    await page.click('text=Log out');
    await page.waitForSelector('text=Log out of all accounts', { timeout: 10000 });
    await page.click('text=Log out of all accounts');
    await expect(page).toHaveURL(/login/);
    console.log('🚪 Logout successful');
  });
});
