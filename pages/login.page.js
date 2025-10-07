export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[placeholder="Enter your email"]');
    this.continueButton = page.getByRole('button', { name: /Continue/i });
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByTestId('login-submit-idf-testid');
  }

  async goToLogin() {
    await this.page.goto('https://trello.com/login');
  }

  async loginuser(username) {
    await this.usernameInput.fill(username);
    await this.continueButton.click();
  }

  async loginpass(password) {
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
