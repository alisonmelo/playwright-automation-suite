import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.acessarSite();
    await expect(page).toHaveTitle("Swag Labs");
})

test('login com sucesso', async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
})
test('Login com falha', async ({ page }) => {
    await loginPage.login("usuario_errado", "secret_sauce");
    await expect(loginPage.alert).toHaveText("Epic sadface: Username and password do not match any user in this service")
})
