# EasyFit - Monitor de Desempenho

Aplicação React + TypeScript para monitoramento de desempenho físico, cálculo de Taxa Metabólica Basal (TMB) e percentual de gordura corporal.

## Como executar

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor JSON (em um terminal):
```bash
npm run server
```

3. Inicie o servidor de desenvolvimento (em outro terminal):
```bash
npm run dev
```

O servidor JSON estará rodando em `http://localhost:3001` e a aplicação em `http://localhost:5173` (ou outra porta indicada pelo Vite).

## Funcionalidades

- Sistema de autenticação (login/registro)
- Cálculo de Taxa Metabólica Basal (TMB) usando fórmulas de Harris-Benedict
- Cálculo de percentual de gordura corporal
- Atualização de perfil do usuário
- Interface responsiva com styled-components

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
