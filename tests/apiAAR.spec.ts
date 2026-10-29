import { test, expect } from "@playwright/test";
const APIUrl = 'https://api-qa-fap2026.onrender.com/api';

test.describe(
    "Testes api no padarão AAR, com geração de massa para UI",
    () => {
        let authToken: string;
        let createdProdID: string;
        const uniqueProdName = `Teclado Mecânico ${Date.now()}`;

        // ARRANGE(SETUP login Lojista)
        test.beforeAll(async ({ request }) => {
            const loginRes = await request.post(`${APIUrl}/login`,
                {
                    data: {
                        email: 'lojista@system.com',
                        password: 'SellerPass123'
                    },
                }
            );
            expect(loginRes.status()).toBe(200);
            const loginData = await loginRes.json();
            authToken = loginData.token;
            expect(authToken).toBeDefined();
            // criar massa de teste (cria um produto)
            const productRes = await request.post(`${APIUrl}/seller/products`,
                {   
                    headers:{
                        Authorization:`Bearer ${authToken}`
                },
                    data: {
                        "name": uniqueProdName,
                        "description": "Massa de teste gerada no setup API do tio alison",
                        "category": "Periféricos",
                        "price": 87.9,
                        "stock": 323,
                        "image": "https://exemplo.com/imagens/teclado.jpg"
                    }
                }
            )
            expect(productRes.status()).toBe(201);
            const productBody = await productRes.json();
            createdProdID = productBody.product._id;
            expect(createdProdID).toBeDefined();
        })
        test("Validar produto recem criado", 
            async ({request})=>{
                expect(createdProdID).toBeDefined();
                const res = await request.get(`
                    ${APIUrl}/products?search=${uniqueProdName}
                    `);
            expect(res.status()).toBe(200);
            const productData = await res.json();
            expect(Array.isArray(productData)).toBeTruthy();
            const targetProd = productData.find(
                (p:any)=>p._id === createdProdID);
            expect(targetProd).toBeDefined();  
            expect(targetProd.name).toBe(uniqueProdName);
            expect(targetProd.stock).toBe(323);
            expect(targetProd.price).toBe(87.9);  


        }
        )
    }
)