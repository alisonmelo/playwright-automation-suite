# Portfólio de automação com TypeScript e Playwright

Projeto criado para praticar automação de testes end-to-end utilizando [Playwright](https://playwright.dev/) e TypeScript.

## Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) — versão 18 ou superior recomendada;
- npm, instalado junto com o Node.js;
- [Yarn](https://yarnpkg.com/) — caso opte por utilizar o gerenciador de pacotes Yarn;
- Git, caso queira clonar o repositório.

Para conferir as versões instaladas:

```bash
node --version
npm --version
yarn --version
```

> Em versões recentes do Node.js, o Yarn pode ser habilitado com `corepack enable`. Como alternativa, instale-o globalmente com `npm install --global yarn`.

## Instalação do projeto

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/alisonmelo/portifolio-automacao-com-typescript.git
cd portifolio-automacao-com-typescript
```

### Utilizando npm

Instale os módulos do projeto:

```bash
npm install
```

### Utilizando Yarn

Instale os módulos do projeto:

```bash
yarn install
```

O Yarn utilizará o arquivo `yarn.lock`, quando ele estiver disponível, para manter as versões das dependências consistentes. Se o projeto ainda não possuir esse arquivo, o comando criará um novo `yarn.lock`.

Instale os navegadores utilizados pelo Playwright:

```bash
# npm
npx playwright install

# Yarn
yarn playwright install
```

> No Linux, se houver problemas com dependências dos navegadores, utilize `npx playwright install --with-deps` ou `yarn playwright install --with-deps`.

## Estrutura principal

- `pages/` — Page Objects, sem validações (`expect`) dentro das páginas;
- `fixtures/` — fixtures compartilhadas, como a sessão autenticada;
- `tests/e2e/` — cenários de interface e fluxos completos;
- `tests/api/` — cenários de API usando o fixture `{ request }` do Playwright;
- `presentation/` — slides da apresentação (PDF ou link, quando disponíveis);
- `playwright.config.ts` — configuração do Playwright;
- `package.json` — dependências e comandos do projeto;
- `package-lock.json` — versões exatas das dependências instaladas pelo npm;
- `yarn.lock` — versões exatas das dependências instaladas pelo Yarn, quando presente.

Os specs estão separados por tipo dentro de `tests/`; os comandos abaixo permitem executar cada grupo. Os testes E2E usam o projeto Chromium configurado em `playwright.config.ts`.

## Execução dos testes

Execute todos os cenários em modo headless:

```bash
# npm
npm test

# Yarn
yarn test
```

Execute somente os testes E2E ou somente os testes de API:

```bash
npm run test:e2e
npm run test:api
```

Execute os testes com a interface visual do navegador:

```bash
# npm
npx playwright test --headed

# Yarn
yarn playwright test --headed
```

Execute um arquivo específico:

```bash
# npm
npx playwright test tests/e2e/nome-do-arquivo.spec.ts

# Yarn
yarn playwright test tests/e2e/nome-do-arquivo.spec.ts
```

Execute apenas um teste pelo título:

```bash
# npm
npx playwright test -g "título do teste"

# Yarn
yarn playwright test -g "título do teste"
```

Execute os testes utilizando o projeto Chromium:

```bash
# npm
npx playwright test --project=chromium

# Yarn
yarn playwright test --project=chromium
```

## Relatório de testes

Após a execução, abra o relatório HTML com:

```bash
# npm
npm run report

# Yarn
yarn report
```

## Depuração

Para executar os testes em modo de depuração:

```bash
# npm
npx playwright test --debug

# Yarn
yarn playwright test --debug
```

Também é possível utilizar o modo de inspeção do Playwright:

```bash
# npm
npx playwright codegen https://exemplo.com

# Yarn
yarn playwright codegen https://exemplo.com
```

Substitua a URL pelo endereço da aplicação que deseja explorar.

## Criando um cenário de teste

Crie um arquivo com a extensão `.spec.ts` em `tests/e2e/` para um teste de interface ou em `tests/api/` para um teste de API. Exemplo E2E:

```typescript
import { test, expect } from '@playwright/test';

test('deve acessar a página inicial', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});
```

Depois, execute o cenário com:

```bash
# npm
npx playwright test

# Yarn
yarn playwright test
```

## Boas práticas

- Escolha apenas um gerenciador de pacotes por instalação: npm ou Yarn;
- Não misture `package-lock.json` e `yarn.lock` sem necessidade;
- Utilize seletores estáveis, como `getByRole`, `getByText` e `getByTestId`;
- Mantenha cada cenário independente dos demais;
- Evite o uso de `waitForTimeout` sempre que possível;
- Use `expect` para validar os resultados esperados;
- Não salve informações sensíveis diretamente no código;
- Organize os cenários por funcionalidade dentro da pasta `tests/`.

## Comandos úteis

| npm | Yarn | Descrição |
| --- | --- | --- |
| `npm install` | `yarn install` | Instala as dependências do projeto |
| `npx playwright install` | `yarn playwright install` | Instala os navegadores do Playwright |
| `npm test` | `yarn test` | Executa todos os testes |
| `npm run test:e2e` | `yarn run test:e2e` | Executa os testes E2E |
| `npm run test:api` | `yarn run test:api` | Executa os testes de API |
| `npx playwright test --headed` | `yarn playwright test --headed` | Executa os testes com o navegador visível |
| `npx playwright test --debug` | `yarn playwright test --debug` | Executa os testes em modo de depuração |
| `npm run report` | `yarn report` | Abre o relatório HTML |
| `npx playwright codegen <url>` | `yarn playwright codegen <url>` | Gera código a partir da interação com uma página |
