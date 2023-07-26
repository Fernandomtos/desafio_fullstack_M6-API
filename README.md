# Projeto Desafio_fullstack_sprint2M6

# Para o desenvolvimento dessa API;

- O código em **TypeScript** com **TypeORM** e banco de dados **postgres**;
- **Serialização** utilizado a biblioteca **zod**;

# Tabelas

Tabela users ("clientes");
Tabela contacts ("contatos");

## Endpoints:

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
