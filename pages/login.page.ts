import { Page, Locator } from "@playwright/test";
export class LoginPage {
    readonly page: Page;
    readonly alert: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alert = page.getByRole('alert')
    }
    async acessarSite() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    async login(email:string, password:string) {
        await this.page.locator('#user-name').fill(email);
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button',{name:"login-button"}).click();
    }   

}