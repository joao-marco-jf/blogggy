# Blogggy Backend

Este é o backend da aplicação **Blogggy**, responsável por gerenciar autenticação, postagem de conteúdos e o armazenamento de dados de usuários e postagens. O backend é desenvolvido em **Express.js**, utilizando **JWT** para autenticação e **PostgreSQL (via Supabase)** como banco de dados.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o servidor backend.
- **Express.js**: Framework para desenvolvimento de APIs e servidores em Node.js.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar informações de usuários e postagens.
- **JWT**: JSON Web Tokens para autenticação.
- **Jest**: Ferramenta de testes utilizada para garantir a qualidade do código.
- **Supabase**: Interface para gerenciamento do banco de dados PostgreSQL.
  
## Estrutura de Pastas

- **app**: Contém a lógica principal da aplicação.
  - **controllers**: Controladores responsáveis por lidar com requisições HTTP.
    - `auth.js`: Gerencia a autenticação dos usuários.
    - `posts.js`: Gerencia as operações relacionadas às postagens (criação, leitura, remoção).
  - **database**: Configurações e conexões com o banco de dados.
    - `index.js`: Arquivo de conexão com o banco de dados Supabase.
  - **middleware**: Middlewares utilizados na aplicação.
    - `auth.guard.js`: Middleware responsável por verificar a autenticação com JWT.
  - **routes**: Define as rotas do backend.
    - `auth.js`: Rotas relacionadas à autenticação (login, cadastro).
    - `posts.js`: Rotas relacionadas às postagens.
  - **services**: Serviços utilizados para regras de negócios e manipulação de dados.
    - `images.js`: Serviço de manipulação de imagens (ex. compressão, upload).
    - `index.js`: Inicializa os serviços do backend.
  - **tests**: Testes unitários do backend.
    - `posts.test.js`: Testes relacionados às funcionalidades de postagens.
  
- **tests**: Pasta separada para arquivos de teste.
  - `posts.test.js`: Testes para o CRUD de postagens.
  
- **.env.example**: Exemplo do arquivo de variáveis de ambiente.
- **.gitignore**: Arquivos e pastas ignoradas pelo Git.
- **jest.config.js**: Configuração do Jest para testes.
- **server.js**: Arquivo principal que inicia o servidor Express.

## Variáveis de Ambiente

O arquivo `.env` deve ser configurado com as seguintes variáveis:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

## Scripts Disponíveis

No diretório `backend`, você pode executar os seguintes scripts:

- **`npm run dev`**: Inicia o servidor backend em ambiente de desenvolvimento.
- **`npm test`**: Executa os testes automatizados utilizando Jest.

## Testes

Os testes são implementados utilizando **Jest**. Para rodar os testes, execute:

```bash
npm test
```

Os testes garantem que as principais funcionalidades da API de postagens funcionam corretamente.

## Endpoints

### Autenticação

- **POST** `/auth/login`: Realiza login e retorna um token JWT.
- **POST** `/auth/register`: Realiza o registro de um novo usuário.

### Postagens

- **GET** `/posts`: Retorna todas as postagens.
- **POST** `/posts`: Cria uma nova postagem.
- **DELETE** `/posts/:id`: Remove uma postagem específica.

## Melhorias Futuras

- Melhorar a otimização das imagens.
- Refatorar a interface da API para maior usabilidade.
- Implementar um sistema de roles para usuários.