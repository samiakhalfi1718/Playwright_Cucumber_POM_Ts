import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { chromium } from "playwright";

let page: any;
let loginPage: LoginPage;

Given("l'utilisateur est sur la page de connexion", async function () {
  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

When("il saisit {string} et {string}", async function (email: string, password: string) {
  await loginPage.login(email, password);
});

Then("il doit être redirigé vers la page d'accueil", async function () {
  await page.waitForURL("https://www.saucedemo.com/inventory.html");
  expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
  await page.close();
});
