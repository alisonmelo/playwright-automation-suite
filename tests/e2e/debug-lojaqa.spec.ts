import { test, expect } from '@playwright/test';

test.describe('⚡ Live Code — Aula 41 & 42: Debug e Evidências na LojaQA', () => {

  // CENÁRIO 1: Demonstração do page.pause() (Modo Debug interativo)
  test('CT01: Login na LojaQA com pausa para inspeção ao vivo', async ({ page }) => {
    // Acessa o sistema LojaQA oficial da turma FAP 2026
    await page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/login.html');

    // Preenche credenciais oficiais do Cliente (user@system.com / UserPassword123)
    await page.locator('#email').fill('user@system.com');
    await page.locator('#password').fill('UserPassword123');

    // ⏸️ Ponto de Parada: abre o Playwright Inspector durante a execução
    // Dica do Alison: Mostre para os alunos como o robô congela aqui!
    // await page.pause(); 

    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/.*dashboard/);
  });

  // CENÁRIO 2: Simulação de falha proposital para gerar Relatório e Trace
  test('CT02: Adição de produto na LojaQA com validação estrita', async ({ page }) => {
    await page.goto('https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login/produtos.html');

    // Localiza o card do produto na vitrine da LojaQA e clica em Comprar
    const produtoCard = page.locator('.produto-card').first();
    await produtoCard.locator('button:has-text("Adicionar ao Carrinho")').click();

    // Validação com timeout curto proposital para demonstrar o Trace Viewer na aula!
    const badgeCarrinho = page.locator('#cart-badge-count');
    await expect(badgeCarrinho).toHaveText('1', { timeout: 3000 });
  });

});