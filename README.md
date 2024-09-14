# Blogggy

Blogggy é uma aplicação de blog simples e eficiente, desenvolvida como monorepositório usando **Vue.js** no frontend e **Express.js** no backend. O foco do projeto é permitir aos usuários criar, visualizar e remover postagens de maneira segura, utilizando autenticação JWT para proteção das rotas e APIs. Os dados são armazenados em um banco de dados **PostgreSQL** via **Supabase**, garantindo uma infraestrutura moderna e escalável.

Este projeto foi desenvolvido em **3 dias** como um MVP (Minimum Viable Product), e embora esteja funcional, há espaço para melhorias, principalmente na otimização de imagens e na interface do usuário.

## Funcionalidades

### 1. CRUD Completo de Postagens
- **Criação**: Os usuários autenticados podem criar novas postagens com título e conteúdo.
- **Leitura**: As postagens são exibidas em uma interface amigável, com uma lista de posts no frontend.
- **Remoção**: Os usuários podem deletar suas postagens.
- **Proteção JWT**: Apenas usuários autenticados podem criar e remover posts.

### 2. Autenticação JWT
- O sistema de autenticação usa **JSON Web Tokens (JWT)** para garantir que apenas usuários autenticados possam acessar determinadas rotas e APIs. O token é gerado no login e validado em cada requisição protegida.

### 3. Armazenamento com PostgreSQL (via Supabase)
- O banco de dados utilizado é o **PostgreSQL**, que armazena as informações de usuários e postagens. A integração com o **Supabase** torna fácil o gerenciamento e escalabilidade dos dados, além de fornecer uma camada adicional de segurança.

### 4. Suporte a Testes no Backend
- Testes automatizados foram implementados utilizando **Jest** e **Babel** no backend, permitindo que os desenvolvedores testem a API com facilidade e garantam a estabilidade do código.

## Tecnologias Utilizadas

### Frontend
- **Vue.js**: Framework JavaScript para construção da interface de usuário.
- **Vue Router**: Gerenciamento de rotas no frontend.
- **Axios**: Para realizar requisições HTTP ao backend.

### Backend
- **Express.js**: Framework para construção do servidor e APIs RESTful.
- **JWT (JSON Web Token)**: Para autenticação e proteção das rotas da API.
- **Supabase**: Plataforma que gerencia o banco de dados PostgreSQL e fornece autenticação e APIs em tempo real.
- **PostgreSQL**: Banco de dados relacional para armazenamento dos dados de postagens e usuários.

### DevOps e Ferramentas
- **Concurrently**: Para rodar o backend e o frontend em paralelo durante o desenvolvimento.
- **Babel**: Para transpilação do código no backend.
- **Jest**: Framework de testes utilizado no backend para garantir qualidade e confiabilidade do código.

## Estrutura do Projeto

A aplicação é organizada em um monorepositório que separa as responsabilidades do frontend e backend, conforme mostrado abaixo:

```
/backend    -> Código da API (Express.js) e lógica do servidor
/frontend   -> Código do frontend (Vue.js) para interação com o usuário
```

- O frontend é responsável pela interface de usuário, onde os usuários podem interagir com as postagens e fazer login.
- O backend lida com a lógica da API, autenticação e interação com o banco de dados PostgreSQL via Supabase.

## Requisitos para Rodar o Projeto

- **Node.js** (versão 14.x ou superior)
- **PostgreSQL** (ou acesso ao **Supabase**)
- **npm** ou **yarn** para gerenciamento de pacotes

## Configuração do Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/joaomarcos/blogggy.git
cd blogggy
```

### 2. Instale as Dependências

Na pasta raiz do projeto, execute o comando:

```bash
npm install
```

Isso instalará todas as dependências necessárias para rodar tanto o backend quanto o frontend.

### 3. Configuração do Supabase

1. Crie uma conta no [Supabase](https://supabase.com/).
2. Crie um novo projeto e configure seu banco de dados PostgreSQL.
3. Adicione as chaves de API do Supabase nas variáveis de ambiente, tanto no backend quanto no frontend.
4. Configure suas tabelas para armazenar usuários e postagens.

### 4. Variáveis de Ambiente

No backend, crie um arquivo `.env` com as seguintes variáveis:

```
DATABASE_URL=<sua-url-do-supabase>
JWT_SECRET=<sua-chave-secreta-JWT>
```

### 5. Rodando a Aplicação

Para rodar o backend e o frontend simultaneamente durante o desenvolvimento, execute:

```bash
npm run dev
```

Isso iniciará tanto o backend (Express) quanto o frontend (Vue.js) em modo de desenvolvimento.

Se preferir rodar cada um separadamente, você pode executar:

- **Backend**: `npm run dev:backend`
- **Frontend**: `npm run dev:frontend`

### 6. Testes

Os testes unitários do backend podem ser executados com o comando:

```bash
npm run test:backend
```

## Problemas Conhecidos

- **Otimização de Imagens**: A aplicação ainda não implementa uma solução eficaz para otimização de imagens carregadas pelos usuários.
- **Interface do Usuário**: Algumas partes da interface carecem de refinamento, e há espaço para melhorar a experiência do usuário.
  
## Melhorias Planejadas

- Implementar otimização de imagens para melhorar o carregamento das postagens com conteúdo visual.
- Melhorar a interface do usuário, tornando-a mais atraente e intuitiva.
- Adicionar funcionalidades de edição de postagens.
- Implementar paginação para lidar com grandes quantidades de postagens.
- Melhorar o desempenho geral da aplicação, especialmente no frontend.

## Como Contribuir

Sinta-se à vontade para fazer um fork deste repositório e enviar pull requests com melhorias, correções de bugs ou novas funcionalidades.

### Passos para contribuir:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua funcionalidade (`git checkout -b minha-funcionalidade`).
3. Faça as alterações necessárias e commit (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie a branch para o seu repositório (`git push origin minha-funcionalidade`).
5. Abra um Pull Request no repositório original.

## Autor

Desenvolvido por **João Marcos Jensen Francisco**. Sinta-se à vontade para entrar em contato em caso de dúvidas ou sugestões!

## Licença

Este projeto está licenciado sob a licença **ISC**. Consulte o arquivo `LICENSE` para mais detalhes.