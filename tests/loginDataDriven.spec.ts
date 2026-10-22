import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/loginPage';
import { ctsLogins } from '../data/login.data';

test.describe('Autenticação Data-drive de multiplos perfis com POM',
    ()=>{
        for (const cenarios of ctsLogins){
           test(`Login com Perfil: ${cenarios.perfil}`, 
            async ({page})=>{
                const loginPage = new LoginPage(page);
                await loginPage.goto();
                await loginPage.login(cenarios.email, 
                    cenarios.senha);

                if(cenarios.esperaSucesso){
                    await expect(page).toHaveURL(cenarios.urlEsperada)
                }else{
                    await expect(loginPage.errorMessage).toBeVisible();
                    await expect(page).toHaveURL(cenarios.urlEsperada)
                }    
            }) 
        }
        
    }
)