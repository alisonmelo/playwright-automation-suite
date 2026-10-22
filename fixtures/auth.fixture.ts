import {test as base, expect, Page} from "@playwright/test";
import { LoginPage } from "../pages/loginPage";

type authFixture={
    loginPage: LoginPage;
    loggedPage: Page;
};

export const test = base.extend<authFixture>({
    //entregando a pagina ja estancianda no test
    loginPage: async ({page}, use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await use(loginPage);
    },
    //entregando pagina logada admin
    loggedPage: async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('admin@system.com','AdminPassword123');
        await page.waitForURL(/painel\.html/);
        await use(page);
    }
});

export {expect} from "@playwright/test";