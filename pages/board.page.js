export class BoardPage {
  constructor(page) {
    this.page = page;
    this.createBoardButton = page.locator('button[data-test-id="create-board-tile"]');
    this.boardNameInput = page.locator('input[placeholder="Add board title"]');
    this.submitBoardButton = page.locator('button[type="submit"]');
    this.menuButton = page.getByRole('button', { name: 'Mostrar menú' }); 
    this.visibilityButton = page.getByRole('button', { name: /Visibilidad|Visibility/i }); 
    this.workspaceOption = page.getByTestId('board-visibility-dropdown-Espacio de trabajo');
    this.closeButton = page.getByRole('button', { name: 'Cerrar ventana emergente' })
    this.favoriteButton = page.getByRole('button', { name: "Quitado de favoritos" });
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
    await this.closeButton.click();
  }

  async markAsFavorite() {
    await this.menuButton.click();
    await this.favoriteButton.click();
    await this.closeButton.click();
  }
}
