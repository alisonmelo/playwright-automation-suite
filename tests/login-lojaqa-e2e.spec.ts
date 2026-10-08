import { test, expect } from '@playwright/test';

const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login';

test.describe('ato 1 - validar carregamento e visibilidade de elementos', async () => {

  test('Validar titulo e carregamento da pagina', async ({ page }) => {
    //navegar ate pagina de login
    await page.goto(`${BASE_URL}/login.html`)
    //validar titulo
    await expect(page).toHaveTitle(/LojaQA | Entrar/i);
  });
  test('Verificar exibicao dos campos do form de login', async ({ page }) => {

    //navegar ate pagina de login
    await page.goto(`${BASE_URL}/login.html`)

    //validar campos
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible();
    //verificar se btn esta desativado
    await expect(page.locator('#loginBtn')).toBeDisabled();

  });

});

test.describe('ATO 2 - Caminho Feliz', ()=>{
  test('validar acesso e redicionar ao painel',async({page})=>{
    //navegar ate pagina de login
    await page.goto(`${BASE_URL}/login.html`)
    // preencher campoos utilizando o fill()
    await page.fill('#email','zezo@pt.com');
    await page.fill('#password', '123456789');
    //Validar botao ativo
    await expect(page.locator('#loginBtn')).toBeEnabled();
    // Acao de clique no btn
    await page.click('#loginBtn');
    //validar o redirecioamento para a pagina /painel
    await expect(page).toHaveURL(/painel\.html/);
  })

  test('Verificar botão login desativado quando email incorreto', 
    async ({ page }) => {
 //navegar ate pagina de login
    await page.goto(`${BASE_URL}/login.html`)

    // preencher campoos utilizando o fill()
    await page.fill('#email','email_sem_formato');
    await page.fill('#password', '123456789');
    //Validar botao ativo
    await expect(page.locator('#loginBtn')).toBeDisabled();
  })

})

test.describe('Ato 3 — Criar usuários e validar cadastro e login', () => {
  // O Playwright vai rodar isso em um ambiente limpo ANTES de cada teste abaixo
  test.beforeEach(async ({ page }) => {
    // 1. Navega até a página
    await page.goto(`${BASE_URL}/login.html`);
    // 2. Clica no link para alternar para o formulário de cadastro
    await page.locator('.login-links a').first().click();
  });

test('validar visibilidade dos campos do form de cadastro', async ({ page }) => {
    await expect(page.locator('#reg-name')).toBeVisible();
    await expect(page.locator('#reg-email')).toBeVisible();
    await expect(page.locator('#reg-password')).toBeVisible();
    await expect(page.locator('#reg-role')).toBeVisible();
    await expect(page.locator('#registerBtn')).toBeVisible();
  });

  test('deve realizar cadastro e login de um usuário cliente', async ({ page }) => {
    const randomEmail = `cliente_${Date.now()}@example.com`;
    await page.fill('#reg-name', 'Cliente Teste');
    await page.fill('#reg-email', randomEmail);
    await page.fill('#reg-password', '123456789');
    await page.selectOption('#reg-role', 'user');
    
    await expect(page.locator('#registerBtn')).toBeEnabled();
    await page.click('#registerBtn');

    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible();

    await page.fill('#email', randomEmail);
    await page.fill('#password', '123456789');
    await expect(page.locator('#loginBtn')).toBeEnabled();
    await page.click('#loginBtn');
    
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('deve revelar campo de loja ao selecionar perfil lojista, cadastrar e logar', async ({ page }) => {
    const randomEmail = `lojista_${Date.now()}@example.com`;

    await page.fill('#reg-name', 'Lojista Teste');
    await page.fill('#reg-email', randomEmail);
    await page.fill('#reg-password', 'SenhaForte123');
    
    await page.selectOption('#reg-role', 'seller');

    const storeNameInput = page.locator('#reg-store-name');
    await expect(storeNameInput).toBeVisible();
    await page.fill('#reg-store-name', 'Loja do Alison');

    await expect(page.locator('#registerBtn')).toBeEnabled();
    await page.click('#registerBtn');

    await expect(page.locator('#email')).toBeVisible();

    await page.fill('#email', randomEmail);
    await page.fill('#password', 'SenhaForte123');
    await page.click('#loginBtn');

    await expect(page).toHaveURL(/painel\.html/);
  });

});