import { expect } from '@playwright/test';
export class TrelloBoardPage {
  constructor(page) {
    this.page = page;
    this.shareButton = 'button[data-testid="board-share-button"]'; 
    this.inviteInput = 'input[data-testid="add-members-input"]';
    this.sendInviteButton = 'button[data-testid="team-invite-submit-button"]';
    this.roleButtonInMember = name => `div[data-testid="member-item"]:has(span[data-testid="member-list-item-full-name"]:has-text("${name}")) button[data-testid="board-permission-selector-dropdown--trigger"]`;
    this.roleOption = role => this.page.locator('span[data-item-title="true"]', { hasText: role });


    this.removeButton = name => `div[data-testid="member-item"]:has(span[data-testid="member-list-item-full-name"]:has-text("${name}")) button span[data-item-title="true"]:has-text("Quitar del tablero")`;
    this.memberItem = name => `div[data-testid="member-item"]:has(span[data-testid="member-list-item-full-name"]:has-text("${name}")) button[data-testid="board-permission-selector-dropdown--trigger"]`;
    this.confirmRemoveButton = 'button[data-testid="confirm-remove-deactivated-member-button"]';
  }

  async openBoard(url) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(url);
  }

  async clickShare() {
    await this.page.click(this.shareButton);
  }

  async addMember(email) {
    await this.page.fill(this.inviteInput, email);
    await this.page.keyboard.press('Enter');
    await this.page.click(this.sendInviteButton);
  }

  async changeRole(email_name, role) {
    const selector = this.roleButtonInMember(email_name);
    await this.page.waitForSelector(selector, { timeout: 30000 });
    await this.page.click(selector);
    await this.roleOption(role).click();
  }

  async removeMember(email_name) {
    const memberSelector = this.roleButtonInMember(email_name);
    await this.page.waitForSelector(memberSelector, { timeout: 15000 });
    await this.page.click(memberSelector);
    await this.page.waitForTimeout(1000);

    const removeButton = this.page.locator('text=Quitar del tablero'); //!TODO BOTON NO SE ENCUENTRA MARIA
    await removeButton.waitFor({ timeout: 10000 });
    await removeButton.click();

    const confirmButton = this.page.locator(this.confirmRemoveButton);
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
  }

}

