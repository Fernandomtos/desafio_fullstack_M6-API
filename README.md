# Projeto Desafio_fullstack_sprint2M6

# Para o desenvolvimento dessa API;

Requisito:

- NodeJs;

- O código em **TypeScript** com **TypeORM** e banco de dados **postgres**;
- **Serialização** utilizado a biblioteca **zod**;

Necessário:
1 - Fazer o clone do repositório;
2 - Instalar as dependências do projeto com o comando: npm install;
3 - Adicinor na raiz do projeto o arquivo .env e adicionar suas configurações;
4 - Rodar o servidor de desenvolvimento com o comando: npm run dev;

## Repositório FrontEnd:

https://github.com/Fernandomtos/desafio_fullstack_M6-FRONTEND

# Tabelas

Tabela users ("clientes");
Tabela contacts ("contatos");

## Endpoints - http://localhost:3000:

| Método | Endpoint              | Responsabilidade                  | Autenticação                           |
| ------ | --------------------- | --------------------------------- | -------------------------------------- |
| POST   | /users                | Criação de usuário                | Qualquer usuário, não necessita token  |
| GET    | /users                | Lista todos os usuários           | Apenas Admnistradores                  |
| GET    | /users/:id            | Lista usuário por Id              | Apenas Admnistradores ou dono da conta |
| PATCH  | /users/:id            | Atualiza um usuário               | Apenas Admnistradores ou dono da conta |
| DELETE | /users/:id            | Realiza um soft delete no usuário | Apenas Admnistradores                  |
| PUT    | /users/:id/recover    | Recuperação do usuário "deletado" | Apenas Admnistradores                  |
| POST   | /login                | Gera o token de autenticação      | Qualquer usuário, não necessita token  |
| POST   | /contacts             | Criação de contatos               | Qualquer usuário, obrigatório token    |
| GET    | /contacts             | Lista todos as contatos           | Qualquer usuário, obrigatório token    |
| GET    | /contacts/:id/        | Lista contato por Id              | Qualquer usuário, obrigatório token    |
| PATCH  | /contacts/:id         | Atualiza um usuário               | Apenas Admnistradores ou dono da conta |
| DELETE | /contacts/:id         | Realiza um soft delete no usuário | Apenas Admnistradores                  |
| PUT    | /contacts/:id/recover | Recuperação do usuário "deletado" | Apenas Admnistradores                  |

## Métodos API

URL:
http://localhost:3000/login

Método Post:

{
"email": "fernando@mail.com",
"password": "1234"
}

URL:
http://localhost:3000/users

## Método Post: (CreateUser - Admin)

{
"name":"Fernando",
"email": "fernando@mail.com",
"password": "1234",
"fone": "(99) 99999999",
"admin": true
}

## Método Post: (CreateUser - Usuário Comun)

{
"name":"Fernando",
"email": "fernando@mail.com",
"password": "1234",
"fone": "(99) 99999999"
}

## Método Get: (listar todos usuários)

obrigatório {token};
admin deve ser true;

## Método Get: (listar usuário por Id)

URL:
http://localhost:3000/users/id

obrigatório {token};
admin deve ser true;

## Método Delete: (deletar usuário)

URL:
http://localhost:3000/users/id

obrigatório {token};
admin deve ser true;

Admin consegue realizar o soft-delete de qualquer usuário e Usuário comum consegue apenas realizar seu soft-delete;

## Método Recover User: (recuperar usuário com soft-delete)

URL:
http://localhost:3000/users/id/recover

obrigatório {token};
admin deve ser true;

Apenas Admin consegue ativar usuários deletados;

## Método Update: (atualizar perfil usuário)

URL:
http://localhost:3000/users/id

obrigatório {token};
admin deve ser true;

Admin consegue atualizar qualquer usuário e Usuário comum consegue apenas realizar atualização dos seus dados;
