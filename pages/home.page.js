import { expect } from '@playwright/test';

export class HomePage {
  constructor(page) {
    this.page = page;

    this.profileMenuButton = page.getByTestId('header-member-menu-button');
    this.logoutButton = page.getByTestId('account-menu-logout');
  }

  async logout() {
    await this.profileMenuButton.click();
    await this.page.waitForTimeout(1000); // Esperar a que el menú se abra
    await this.logoutButton.click();
    await expect(this.page).toHaveURL(/id\.atlassian\.com\/logout/);
  }
}