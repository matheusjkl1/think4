# Desafio Think4 - CRUD Commerce

## Pré-requisitos
  1. `Node >= 14.x.x`
  2. `Npm`
  3. `Docker`

1. Clone o repositório
  * `git clone git@github.com:matheusjkl1/think4.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd think`
 
## Para Iniciar o Projeto

# Frontend

  * Entre na pasta do frontend:
    * `cd frontend`

### Execute o seguinte comando para instalar as dependências de desenvolvimento: 
```sh
yarn install
```

você deve executar o seguinte comando para iniciar o Frontend:

```sh
yarn start
```

Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação no navegador.

# Backend

## Implementações técnicas

### Na pasta backend, crie um arquivo *.env* seguindo com as variáveis de ambiente que estão presentes no arquivo .env.example, *é preferivel o uso dos mesmos valores.*
```sh
SERVER_PORT=3367

DB_PORT=3306
MYSQL_HOST=0.0.0.0
MYSQL_PASSWORD=12345
MYSQL_PORT=3306
MYSQL_DB_NAME=dthink

NODE_ENV=development
EVAL_ALWAYS_RESTORE_DEV_DB=true
NODE_ENV=development
SECRET_KEY=minhachavesecreta
```

### Na pasta backend, execute o seguinte comando que fará a instalação do container docker
```sh
 make down && make up
```
### Após installar as dependências, você deve executar o seguinte comando para iniciar o Back-end:

```sh
yarn dev
```

### Para testar a aplicação no diretório do projeto, você deve executar o seguinte comando:

```sh
yarn test
```

## Após iniciar o projeto temos acesso a 5 rotas

### - Endpoint de usuário

#### *POST*
  Nesta rota é possível *registrar* o usuário
```sh
1 - http://localhost:${SERVER_PORT}/customer/register
```
Ao passar um objeto:
```sh
{
  "name": "name example",
  "cpf": "cpfexample",
  "password": "passwordexample",
  "email": "emailexample@example.com",
}
```
O retorna será:
```sh
{
    "id": "619a9c4aac16ea1246ff3cf9",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlhOWM0YWFjMTZlYTEyNDZmZjNjZjkiLCJpYXQiOjE2Mzc1MjI1MDYsImV4cCI6MTYzNzUyNTgwNn0.0pXkSB-NkrXhk-NTiqsFvBaZxyBjjjZgjp_QppEmsr4"
}
```

  Nesta rota é possível *logar* um usuário
```sh
3 - http://localhost:${SERVER_PORT}/customer/login
```
Ao passar um objeto:
```sh
{
  "email": "emailcadastradoexample",
  "password": "passwordexample",
}
```
O retorna será:
```sh
{
    "id": "619a9c4aac16ea1246ff3cf9",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlhOWM0YWFjMTZlYTEyNDZmZjNjZjkiLCJpYXQiOjE2Mzc1MjI2NzUsImV4cCI6MTYzNzUyNTk3NX0.yODEqEvAvCT0LKoqCAKL-4YUj26OlrsTrD7zs96S5kw"
}
```

### - Endpoint de Compra

#### *GET*
  Nesta rota é possível listar todos os *produtos*
```sh
1 - http://localhost:${SERVER_PORT}/customer/products
```


#### *POST*
  Nesta rota é possível realizar uma *compra*
```sh
1 - http://localhost:${SERVER_PORT}/customer/checkout
```

`Neste caso é necessário passar o token recebido ao realizar o login no Headers da requisição`

```sh
Authorization:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlhOGYxZWRlOWJmN2U2MjcwMWU2MGQiLCJpYXQiOjE2Mzc1MTkxMzQsImV4cCI6MTYzNzUyMjQzNH0.fNGQ-Q9J3GkXhm_KcjCQkRsZxI9wGqd9hYdDJpHLT60
```

Ao passar um objeto:
```sh
{
    {
        userId: 4,
        sellerId: 2,
        totalPrice: 7.5,
        deliveryAddress: 'Rua da Pinga',
        deliveryNumber: '4',
        status: 'Pendente',
    },
    [
     { name: 'Heineken 600ml', quantity: 1, price: '7.50', stock: 5 } 
    ]
 }
```
