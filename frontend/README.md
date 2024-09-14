# Blogggy Frontend

Este é o frontend da aplicação **Blogggy**, desenvolvido com **Vue.js**. O objetivo principal do frontend é permitir que os usuários interajam com o sistema de postagens, incluindo a criação, visualização e gerenciamento de postagens, além de garantir a navegação entre áreas públicas e privadas da aplicação.

## Tecnologias Utilizadas

- **Vue.js**: Framework JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript utilizado para tipagem estática.
- **Cypress**: Ferramenta para testes end-to-end.
- **Vite**: Ferramenta de build e desenvolvimento de aplicações frontend.

## Estrutura de Pastas

- **.vscode**: Configurações relacionadas ao editor VSCode.
- **cypress**: Configurações e arquivos para testes end-to-end com Cypress.
- **public**: Arquivos estáticos e públicos da aplicação (ex. favicon, index.html).
- **src**: Contém todo o código-fonte do frontend.
  - **assets**: Arquivos estáticos como imagens e estilos CSS.
    - `logo.svg`: Logo da aplicação.
    - `main.css`: Estilos globais aplicados na aplicação.
  - **layouts**: Componentes de layout utilizados para estruturar diferentes partes da aplicação.
    - `PrivateLayout.vue`: Layout para páginas privadas (disponíveis apenas após login).
    - `PublicLayout.vue`: Layout para páginas públicas (disponíveis sem login).
  - **router**: Configurações de rotas da aplicação.
    - `index.ts`: Configura e define as rotas para navegação entre páginas públicas e privadas.
  - **views**: Páginas principais da aplicação, organizadas por funcionalidade.
    - `HomeView.vue`: Página inicial da aplicação.
    - `PostsView.vue`: Lista de postagens públicas.
    - `PostView.vue`: Detalhes de uma postagem específica.
    - `PrivateNewPostView.vue`: Página para criar novas postagens (privada).
    - `PrivatePostsView.vue`: Lista de postagens (privada).
    - `PrivatePostView.vue`: Detalhes de uma postagem (privada).
    - `SignInView.vue`: Página de login.

## Configuração do Projeto

### Instalação

Para instalar as dependências do frontend, execute:

```bash
npm install
```

### Ambiente de Desenvolvimento

Para rodar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará o frontend localmente, disponível em `http://localhost:3000`.

### Build para Produção

Para criar uma build otimizada para produção, execute:

```bash
npm run build
```

### Testes

O projeto utiliza **Cypress** para testes end-to-end. Para rodar os testes, use o comando:

```bash
npm run test:e2e
```

## Variáveis de Ambiente

O arquivo `.env` define variáveis essenciais para o funcionamento do frontend. Um exemplo de arquivo `.env` está incluído no projeto como `env.d.ts`.

## Rotas

- **/**: Página inicial.
- **/posts**: Lista de postagens públicas.
- **/post/:id**: Visualização de uma postagem específica.
- **/signin**: Página de login.
- **/private/new-post**: Página para criar uma nova postagem (acesso privado).
- **/private/posts**: Lista de postagens privadas.
- **/private/post/:id**: Visualização de uma postagem privada.

## Melhorias Futuras

- Otimização da interface do usuário para melhor experiência de navegação.
- Melhorar o sistema de roteamento para lidar com erros 404.
- Implementar a funcionalidade de edição de postagens.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.