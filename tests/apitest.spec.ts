import { test, expect } from '@playwright/test';

test('GET ', async ({ request }) => {
  const res = await request.get('');
  
  
});

test('POST ', async ({ request }) => {
  const res = await request.post('', {
    data: { 
      title: 'Teste de QA', 
      body: 'Conteúdo validado pela Turma FAP', 
      userId: 1 
    },
  });

});