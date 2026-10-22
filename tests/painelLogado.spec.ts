import {test, expect} from '../fixtures/auth.fixture'

test.describe('acesso area protegida - painel', ()=>{
    test('Deve acessar painel com usuario já logado', 
        async ({loggedPage})=>{
        // validar se  esta na pagina de painel
        await  expect(loggedPage).toHaveURL(/painel\.html/);
        // verificar existencia de titulo h1 
        const h1Painel = loggedPage.locator('#panelTitle');
        await expect(h1Painel).toBeVisible();
        // Verificar preseça do bt loggout
        const btSair = loggedPage.locator('#logoutButton');
        await expect(btSair).toBeVisible()
    });
});