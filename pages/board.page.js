export class BoardPage {
  constructor(page) {
    this.page = page;
    this.createBoardButton = page.locator('button[data-test-id="create-board-tile"]');
    this.boardNameInput = page.locator('input[placeholder="Add board title"]');
    this.submitBoardButton = page.locator('button[type="submit"]');
    this.menuButton = page.getByTestId('OverflowMenuHorizontalIcon'); 
    this.visibilityButton = page.locator('button:has-text("Visibility:")'); 
    this.workspaceOption = page.locator('button:has-text("Workspace")');
    this.favoriteButton = page.locator('button[data-test-id="star-board"]');
  }

  async createBoard(name) {
    await this.createBoardButton.click();
    await this.boardNameInput.fill(name);
    await this.submitBoardButton.click();
  }

  async changeVisibility() {
    await this.menuButton.click();
    await this.visibilityButton.click();
    await this.workspaceOption.click();
    await expect(this.visibilityButton).toContainText("Espacio de trabajo");
  }

  async markAsFavorite() {
    await this.menuButton.click();
    await this.favoriteButton.click();
  }
}
