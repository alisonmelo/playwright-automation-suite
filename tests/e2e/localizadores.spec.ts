import { test, expect } from '@playwright/test';

/**
 * =========================================================================
 * UNIDADE 13 · AULA 33 — LOCALIZADORES (COMO ENCONTRAR ELEMENTOS)
 * =========================================================================
 * Ordem de preferência recomendada:
 * 1. getByTestId()  -> Mais estável, desacoplado do CSS e texto
 * 2. getByRole()    -> Semântico e acessível (botões, links, títulos)
 * 3. getByText()    -> Bom para textos e mensagens informativas
 * 4. locator(css)   -> Último recurso (frágil a mudanças de layout)
 * =========================================================================
 */
const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login';

test.describe('Aula 33 — Prática das 4 Estratégias de Localização', () => {

  test.beforeEach(async ({ page }) => {
    // Acessa a aplicação de prática
    await page.goto(`${BASE_URL}/login.html`);
  });

  test('Estratégia 1: getByTestId (Padrão Ouro da Automação)', async ({ page }) => {
    // 💡 Configurado via testIdAttribute: 'data-test' no playwright.config.ts
    // Se a aplicação tiver data-test="email-input", usamos getByTestId direto:
    const emailInput = page.getByTestId('email-input').or(page.locator('#email'));
    await expect(emailInput).toBeVisible();
  });

  test('Estratégia 2: getByRole (Acessível e Semântico)', async ({ page }) => {
    // 💡 Localiza pelo papel no DOM (button, link, textbox)
    const btnEntrar = page.getByRole('button', { name: /entrar/i });
    await expect(btnEntrar).toBeVisible();

    // Também podemos buscar headings (h1, h2, h3):
    const titulo = page.getByRole('heading', { level: 2 });
    await expect(titulo).toBeVisible();
  });

  test('Estratégia 3: getByText (Conteúdo Visível)', async ({ page }) => {
    // 💡 Excelente para mensagens de ajuda, rótulos e massas de teste exibidas
    const dicaCredenciais = page.getByText(/Massa de dados para QA/i);
    await expect(dicaCredenciais).toBeVisible();

    const emailExemplo = page.getByText('user@system.com');
    await expect(emailExemplo).toBeVisible();
  });

  test('Estratégia 4: CSS Selector (Rápido, mas requer atenção a classes frágeis)', async ({ page }) => {
    // 💡 Prefira ID (#) ou atributos específicos. Evite encadeamentos longos como div > div:nth-child(2)
    const inputSenha = page.locator('#password');
    await expect(inputSenha).toBeVisible();

    // ❌ Evite: page.locator('.container div:nth-child(3) input')
    // ✅ Prefira: page.locator('#password') ou page.getByTestId('password')
  });

  test('Demonstração de Resiliência: getByRole vs seletor de classe', async ({ page }) => {
    // O botão pode mudar de classe CSS (.btn-primary para .btn-success ou .rounded-lg)
    // Mas seu papel semântico continua sendo um BUTTON com nome 'Entrar'
    const botao = page.getByRole('button', { name: /entrar/i });
    await expect(botao).toBeVisible();
    await expect(botao).toBeDisabled(); // Valida regra de negócio inicial
  });

});
