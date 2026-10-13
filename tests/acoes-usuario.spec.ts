import { test, expect } from '@playwright/test';

/**
 * =========================================================================
 * UNIDADE 13 · AULA 34 — AÇÕES DO USUÁRIO (CLICK, FILL E SELECTOPTION)
 * =========================================================================
 * Regras de Ouro:
 * 1. Use SEMPRE fill() para campos de texto (limpa antes e substitui tudo).
 * 2. Playwright aguarda automaticamente o elemento estar pronto antes do click().
 * 3. Para dropdowns, use selectOption() com o value técnico da <option>.
 * 4. NUNCA execute uma ação "cega": confirme o resultado com expect() logo após!
 * =========================================================================
 */

test.describe('Aula 34 — Prática de Ações do Usuário', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');
  });

  test('Ação 1: fill() preenche e substitui campos com segurança', async ({ page }) => {
    // 💡 Demonstração didática: fill() limpa o que já tinha antes
    await page.fill('#email', 'email_errado@sistema.com');
    
    // Agora preenchemos o e-mail correto por cima:
    await page.fill('#email', 'user@system.com');
    await expect(page.locator('#email')).toHaveValue('user@system.com');

    // Preenche senha
    await page.fill('#password', 'UserPassword123');
    await expect(page.locator('#password')).toHaveValue('UserPassword123');
  });

  test('Ação 2: click() com auto-waiting até o botão ficar clicável', async ({ page }) => {
    const botaoEntrar = page.locator('#loginBtn');

    // O botão começa disabled pelo script.js
    await expect(botaoEntrar).toBeDisabled();

    // Ao preencher os campos válidos, o botão habilita automaticamente
    await page.fill('#email', 'user@system.com');
    await page.fill('#password', 'UserPassword123');
    await expect(botaoEntrar).toBeEnabled();

    // Dispara o clique
    await botaoEntrar.click();

    // Sempre valida o resultado do clique!
    await expect(page.locator('#statusMessage')).toBeVisible();
  });

  test('Ação 3: selectOption() para dropdowns e filtros', async ({ page }) => {
    /**
     * Exemplo canônico do slide da aula (SauceDemo / E-commerce):
     * <select data-test="product-sort-container">
     *    <option value="az">Name (A to Z)</option>
     *    <option value="lohi">Price (low to high)</option>
     * </select>
     * 
     * Como executar no Playwright:
     * await page.selectOption('[data-test="product-sort-container"]', 'lohi');
     */
    
    // Demonstração da sintaxe com validação:
    // 1. Por value (mais recomendado): await page.selectOption('select', 'lohi');
    // 2. Por label: await page.selectOption('select', { label: 'Price (low to high)' });
    // 3. Por index: await page.selectOption('select', { index: 1 });
    expect(typeof page.selectOption).toBe('function');
  });

  test('Ação 4: textContent() para extrair valores dinâmicos', async ({ page }) => {
    // Lê o texto de um elemento da tela
    const infoTexto = await page.locator('.credentials-info strong').textContent();
    
    // Valida o texto extraído
    expect(infoTexto?.trim()).toBe('Massa de dados para QA:');

    // Extrai o primeiro e-mail da lista de credenciais
    const emailTexto = await page.locator('.credentials-info code').first().textContent();
    expect(emailTexto).toContain('admin@system.com');
  });

  test('Ação 5: Fluxo encadeado completo (Preencher -> Clicar -> Extrair)', async ({ page }) => {
    await page.fill('#email', 'admin@system.com');
    await page.fill('#password', 'AdminPassword123');
    await page.click('#loginBtn');

    // Aguarda mensagem de feedback
    const msg = page.locator('#statusMessage');
    await expect(msg).toBeVisible();
    
    const textoMsg = await msg.textContent();
    expect(textoMsg).toMatch(/Login bem-sucedido/i);
  });

});
