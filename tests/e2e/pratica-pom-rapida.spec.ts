import { test, expect, Page, Locator } from '@playwright/test';

/**
 * =========================================================================
 * ⚡ UNIDADE 14 — PRÁTICA RÁPIDA: POM + FIXTURES + DATA-DRIVEN (AULAS 37 & 38)
 * =========================================================================
 * Professor: Alison Melo | Turma FAP 2026
 * Alvo: https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html
 * =========================================================================
 */

// -------------------------------------------------------------------------
// 1. PAGE OBJECT MODEL (AULA 37) — Encapsula seletores e ações
// -------------------------------------------------------------------------
class LojaLoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly statusMessage: Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#loginBtn');
    this.errorMessage = page.locator('#errorMessage');
    this.statusMessage = page.locator('#statusMessage');
  }

  async goto() {
    await this.page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}

// -------------------------------------------------------------------------
// 2. TESTES COM POM (AULA 37) — Testes limpos sem nenhum seletor CSS!
// -------------------------------------------------------------------------
test.describe('Aula 37: Page Object Model na Prática', () => {

  let loginPage: LojaLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LojaLoginPage(page);
    await loginPage.goto();
  });

  test('Cenário 1: Login de sucesso com cliente usando POM', async ({ page }) => {
    // 💡 Ação limpa em uma única linha:
    await loginPage.login('user@system.com', 'UserPassword123');

    // Validação feita no teste, consumindo o locator retornado pela Page:
    await expect(loginPage.statusMessage).toBeVisible();
    await expect(page).toHaveURL(/painel\.html/);
  });

  test('Cenário 2: Login de erro com senha inválida usando POM', async ({ page }) => {
    await loginPage.login('user@system.com', 'SenhaIncorreta999');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Credenciais inválidas');
    await expect(page).toHaveURL(/login\.html/);
  });

  test('Cenário 3: Validação de regra inicial (botão desabilitado)', async () => {
    await expect(loginPage.loginButton).toBeDisabled();
  });

});

// -------------------------------------------------------------------------
// 3. DATA-DRIVEN TEST COM for...of (AULA 38) — Multiplicando cenários
// -------------------------------------------------------------------------
test.describe('Aula 38: Data-Driven Testing com for...of', () => {

  const massaDeTestes = [
    { perfil: 'Cliente Válido', email: 'user@system.com', pass: 'UserPassword123', sucesso: true },
    { perfil: 'Admin Válido', email: 'admin@system.com', pass: 'AdminPassword123', sucesso: true },
    { perfil: 'Senha Incorreta', email: 'user@system.com', pass: 'Senha123Errada', sucesso: false },
    { perfil: 'E-mail Inexistente', email: 'fake@system.com', pass: 'Qualquer123', sucesso: false },
  ];

  // 💡 O for...of gera 1 teste separado no relatório para cada item do array!
  for (const item of massaDeTestes) {
    test(`Data-Driven: ${item.perfil}`, async ({ page }) => {
      const loginPage = new LojaLoginPage(page);
      await loginPage.goto();
      await loginPage.login(item.email, item.pass);

      if (item.sucesso) {
        await expect(page).toHaveURL(/painel\.html/);
      } else {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(page).toHaveURL(/login\.html/);
      }
    });
  }

});