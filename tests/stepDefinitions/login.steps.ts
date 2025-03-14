import { Given, When, Then, After, Before } from "@cucumber/cucumber";
import { Browser, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { chromium } from "playwright";

let browser: Browser;

Before(async function () {
  browser = await chromium.launch({ headless: process.env.CI ? true : false }); // Headless en CI/CD
  this.page = await browser.newPage();
  this.loginPage = new LoginPage(this.page);
});

After(async function () {
  await this.page.close();
  await browser.close();
});

Given("l'utilisateur est sur la page de connexion", async function () {
  await this.loginPage.navigate();
});

When("il saisit {string} et {string}", async function (email: string, password: string) {
  await this.loginPage.fillUsername(email);
  await this.loginPage.fillPassword(password);
  await this.loginPage.clickBtn();
});

Then("il doit être redirigé vers la page d'accueil", async function () {
  await this.page.waitForURL("https://www.saucedemo.com/inventory.html");
  expect(this.page.url()).toBe("https://www.saucedemo.com/inventory.html");
});
