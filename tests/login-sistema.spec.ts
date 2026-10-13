import { test, expect } from '@playwright/test';

test.describe('Fluxo de Login - Sistema de Login (E2E)', () => {
    
    // A URL da aplicação hospedada no GitHub Pages
    const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html';

    // O beforeEach garante que todo teste comece do zero na página correta
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
    });

    test('Cenário 1: Deve carregar a página de login com todos os elementos visíveis', async ({ page }) => {
        // Valida se o título da aba está correto
        await expect(page).toHaveTitle(/Login/i);
        
        // Verifica se os campos obrigatórios e o botão de acesso estão na tela
        await expect(page.locator('input[type="email"]')).toBeVisible(); // Se tiver ID, pode usar page.locator('#email')
        await expect(page.locator('input[type="password"]')).toBeVisible(); // page.locator('#senha')
        await expect(page.getByRole('button', { name: /entrar|login/i })).toBeVisible();
    });

    test('Cenário 2: Caminho Feliz - Login com credenciais válidas', async ({ page }) => {
        // Ação (Act)
        await page.locator('input[type="email"]').fill('aluno@grautecnico.com.br');
        await page.locator('input[type="password"]').fill('senha123');
        await page.getByRole('button', { name: /entrar|login/i }).click();

        // Validação (Assert) - Verifica para onde a aplicação mandou o usuário
        // Se a aplicação redirecionar para um "index.html", nós validamos a nova URL:
        // await expect(page).toHaveURL(/index\.html/);
        
        // Ou podemos validar se algum texto de boas-vindas apareceu:
        // await expect(page.getByText('Bem-vindo')).toBeVisible();
    });

    test('Cenário 3: Caminho de Erro - Senha incorreta', async ({ page }) => {
        // Ação (Act)
        await page.locator('input[type="email"]').fill('aluno@grautecnico.com.br');
        await page.locator('input[type="password"]').fill('senha_errada');
        await page.getByRole('button', { name: /entrar|login/i }).click();

        // Validação (Assert) - Esperamos que a aplicação rejeite e mostre o erro na tela
        // Se o sistema usar um alerta na tela, podemos buscar o texto.
        // await expect(page.getByText('Email ou senha inválidos')).toBeVisible();
    });

    test('Cenário 4: Prevenção - Tentar logar com campos vazios', async ({ page }) => {
        // Clica direto no botão sem preencher nada
        await page.getByRole('button', { name: /entrar|login/i }).click();

        // Valida que o usuário não foi redirecionado e a URL continua a mesma
        await expect(page).toHaveURL(BASE_URL);
    });
});