const { expect } = require('@playwright/test');

class TrelloBoardPage {
  constructor(page) {
    this.page = page;
    this.shareButton = 'button[data-testid="board-share-button"]'; 
    this.inviteInput = 'input[data-testid="add-members-input"]';
    this.sendInviteButton = 'button[data-testid="team-invite-submit-button"]';
    this.roleButtonInMember = name => `div[data-testid="member-item"]:has(span[data-testid="member-list-item-full-name"]:has-text("${name}")) button[data-testid="board-permission-selector-dropdown--trigger"]`;
    this.roleDropdown = 'button[data-testid="board-permission-selector-dropdown--trigger"]';
    this.roleOption = role => `//span[text()="${role}"]`; // "Administrador", "Miembro", "Observador"
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
    await this.page.waitForSelector(selector, { timeout: 15000 });
    await this.page.click(selector);
    await this.page.click(this.roleOption(role));
  }
}

module.exports = { TrelloBoardPage };
