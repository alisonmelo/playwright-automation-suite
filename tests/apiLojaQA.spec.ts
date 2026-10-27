import {test, expect} from "@playwright/test";
const APIUrl = 'https://api-qa-fap2026.onrender.com/api';
test.describe('teste api lojaQA',()=>{

    test("get catalogo lojaQa", async ({request})=>{
        const res = await request.get(`${APIUrl}/products`)
        // VALIDAR STATUS CODE 200
        expect(res.status()).toBe(200);
        // VALIDA SE STATUS ENTRE 200 A 299(STATUS DE SUCESSO DE API OK)
        expect(res.ok).toBeTruthy();

        const bodyRes = await res.json();
        expect(bodyRes[0]).toHaveProperty("_id",'6abe51a2384f04df16c614fe');
        expect(bodyRes[0]).toHaveProperty("name");
        expect(typeof bodyRes[0].name).toBe('string');
    });

     test("post login lojaQa", async ({request})=>{
        const res = await request.post(`${APIUrl}/login`,
            {
                data:{
                    "email": "admin@system.com",
                    "password": "AdminPassword123"
                },
                headers:{
                    'Content-Type':'application/json'
                }
            });
    
        // valida status 200
        expect(res.status()).toBe(200);
        // validar json
        const resBody = await res.json();
        expect(resBody).toHaveProperty("token");
        expect(typeof resBody.token).toBe('string');
        expect(resBody.token.length).toBeGreaterThan(10);
     });
})