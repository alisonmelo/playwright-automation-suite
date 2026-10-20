import {Page, Locator} from '@playwright/test';
//RECEBER O PAGE NO CONSTRUCTOS
//ENCAPSULA OS SELETORES/UI
//METODOS CLAROS EX: login(),fillEmail()...
//METODOS RETONAM OS LOCATOS PARA O TESTE APENAS FAZER O (ASSERT)
//MELHOR PQ SE UM SELETOR MUDAR NO HTML SO ATUALIZAMOS EM UM UNICO LOCAL NO PAGE OBJECT
export class LoginPage{
    //Locators
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly statusMessage: Locator;
    readonly credentialsBox: Locator;

    constructor(private page:Page){
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#loginBtn');
        this.errorMessage = page.locator('#errorMessage');
        this.statusMessage = page.locator('#statusMessage');
        this.credentialsBox = page.locator('.credentials-info');
    }

    // navegara para tela de login

    async goto(){
        await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html')
    }

    // função/metodo/Ação de login
    async login(username: string, password:string){
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    //apenas preencher email
    async fillEmail(email:string){
        await this.emailInput.fill(email);
    }
    //apenas preencher senha
    async fillPassword(password:string){
        await this.passwordInput.fill(password);
    }
    //apenas clicar no bt de login
    async clickSubmit(){
        await this.loginButton.click();
    }
}
