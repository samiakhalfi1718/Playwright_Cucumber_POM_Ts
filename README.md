# Playwright_Cucumber_POM_Ts
Voici comment configurer un projet Playwright avec Cucumber et le Page Object Model (POM) en TypeScript.
________________________________________
🚀 1. Initialisation du projet
Créez un dossier et initialisez un projet Node.js :


mkdir projet-playwright-cucumber && cd projet-playwright-cucumber


npm init -y
________________________________________
📦 2. Installation des dépendances
Installez Playwright, Cucumber, et les outils nécessaires :


npm install --save-dev @playwright/test playwright


npx playwright install


npm install --save-dev @cucumber/cucumber ts-node @types/node


________________________________________
📁 3. Structure du projet
Organisez votre projet comme ceci :
![image](https://github.com/user-attachments/assets/ca42c675-764b-42be-881d-2bcf96e76475)


⚙️ 4. Configuration de TypeScript
Créez un fichier tsconfig.json à la racine :


{

  "compilerOptions": {
  
    "target": "ES6",
    
    "module": "CommonJS",
    
    "strict": true,
    
    "esModuleInterop": true,
    
    "skipLibCheck": true,
    
    "forceConsistentCasingInFileNames": true,
    
    "outDir": "dist"
    
  }
  
}
________________________________________
⚙️ 5. Configuration de Cucumber
Créez un fichier cucumber.js à la racine :


module.exports = {

  default: {
  
    require: ["tests/stepDefinitions/*.ts"],
    
    format: ["progress-bar"],
    
    paths: ["tests/features/*.feature"],
    
    requireModule: ["ts-node/register"],
    
    worldParameters: {},
    
  },
};
________________________________________





✍️ 6. Création d'un scénario Cucumber
Créez un fichier tests/features/login.feature :


Feature: Authentification


  Scenario: Connexion avec des identifiants valides
  
    Given l'utilisateur est sur la page de connexion
    
    When il saisit "standard_user" et "secret_sauce"
    
    Then il doit être redirigé vers la page d'accueil

    
________________________________________
🏗 7. Création du Page Object Model
Dans tests/pages/login.page.ts :

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
________________________________________




🖊 8. Implémentation des Step Definitions
Dans tests/stepDefinitions/login.steps.ts :


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
________________________________________




🎯 9. Exécution des tests

Ajoutez un script dans package.json :


"scripts": {

  "test": "cucumber-js"
  
}


Lancez les tests avec :

npm test
________________________________________

✅ Et voilà ! Vous avez un projet Playwright + Cucumber + POM fonctionnel en TypeScript.
