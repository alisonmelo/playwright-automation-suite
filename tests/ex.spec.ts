import {test, expect} from "../fixtures/auth.fixture";

test('usuario já logado', async ({loggedPage}) =>{
    await expect(loggedPage).toHaveURL(/painel\.html/)
})