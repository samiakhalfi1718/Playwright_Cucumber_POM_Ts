import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async fillUsername(email: string) {
    await this.page.fill("#user-name", email);
  }

  async fillPassword(password: string) {
    await this.page.fill("#password", password);
  }

  async clickBtn() {
    await this.page.click("#login-button");
  }
}