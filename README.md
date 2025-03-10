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
  

  async login(email: string, password: string) {
  
    await this.page.fill("#username", email);
    
    await this.page.fill("#password", password);
    
    await this.page.click("#login-button");
    
  }
}
________________________________________




🖊 8. Implémentation des Step Definitions
Dans tests/stepDefinitions/login.steps.ts :


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
