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
    "id": 5,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTYzNzgyNzk5MywiZXhwIjoxNjM3ODMxMjkzfQ.53IaAXk09FPlsyeHeQgD_5zj9j-KUXdXGO5yY4XhFLU",
    "name": "Aderbar Pereira Santos",
    "email": "santos@cap.com",
    "cpf": "12345678911",
    "role": "customer",
    "updatedAt": "2021-11-25T08:13:13.595Z",
    "createdAt": "2021-11-25T08:13:13.595Z"
}
```

  Nesta rota é possível *logar* um usuário
```sh
3 - http://localhost:${SERVER_PORT}/customer/login
```
Ao passar um objeto:
```sh
{
  "email": "emailcadastradoexample@email.com",
  "password": "passwordexample",
}
```
O retorna será:
```sh
{
    "name": "Aderbar Pereira Santos",
    "email": "santos@cap.com",
    "cpf": "12345678911",
    "role": "customer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mzc4MjgwMzUsImV4cCI6MTYzNzgzMTMzNX0.8rXKcmbm1CKo0M-IECTmYJ2l1aiQ2Q-ZAdFt4WOMGOw"
}
```

### - Endpoint de Compra

#### *GET*
  Nesta rota é possível listar todos os *produtos*
```sh
1 - http://localhost:${SERVER_PORT}/customer/products
```

O retorna será:
```sh
[
    Product {
      dataValues: {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        stock: 4,
        urlImage: 'http://localhost:3367/images/skol_lata_350ml.jpg'
      },
      _previousDataValues: {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        stock: 4,
        urlImage: 'http://localhost:3367/images/skol_lata_350ml.jpg'
      },
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    },
    Product {
      dataValues: {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        stock: 3,
        urlImage: 'http://localhost:3367/images/heineken_600ml.jpg'
      },
      _previousDataValues: {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        stock: 3,
        urlImage: 'http://localhost:3367/images/heineken_600ml.jpg'
      },
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    },
    Product {
      dataValues: {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        stock: 5,
        urlImage: 'http://localhost:3367/images/antarctica_pilsen_300ml.jpg'
      },
      _previousDataValues: {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        stock: 5,
        urlImage: 'http://localhost:3367/images/antarctica_pilsen_300ml.jpg'
      },
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    },
    Product {
      dataValues: {
        id: 4,
        name: 'Brahma 600ml',
        price: '7.50',
        stock: 5,
        urlImage: 'http://localhost:3367/images/brahma_600ml.jpg'
      },
      _previousDataValues: {
        id: 4,
        name: 'Brahma 600ml',
        price: '7.50',
        stock: 5,
        urlImage: 'http://localhost:3367/images/brahma_600ml.jpg'
      },
      _changed: Set(0) {},
      _options: {
        isNewRecord: false,
        _schema: null,
        _schemaDelimiter: '',
        raw: true,
        attributes: [Array]
      },
      isNewRecord: false
    }
]

```


#### *POST*
  Nesta rota é possível realizar uma *compra*
```sh
1 - http://localhost:${SERVER_PORT}/sales
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

O retorna será:
```sh
dataValues: {
  id: 3,
  userId: 4,
  ellerId: 2,
  totalPrice: 2.2,
  deliveryAddress: 'Rua francisco',
  deliveryNumber: '1',
  status: 'Pendente',
  saleDate: 2021-11-25T08:22:59.477Z,
  updatedAt: 2021-11-25T08:22:59.478Z,
  createdAt: 2021-11-25T08:22:59.478Z
},
```

#### *GET*
  Nesta rota é possível listar compras de um *usuário*
```sh
2 - http://localhost:${SERVER_PORT}/sales
```

`Neste caso é necessário passar o token recebido ao realizar o login no Headers da requisição`

```sh
Authorization:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTlhOGYxZWRlOWJmN2U2MjcwMWU2MGQiLCJpYXQiOjE2Mzc1MTkxMzQsImV4cCI6MTYzNzUyMjQzNH0.fNGQ-Q9J3GkXhm_KcjCQkRsZxI9wGqd9hYdDJpHLT60
```

O retorna será:
```sh
[
    {
        "id": 1,
        "userId": 4,
        "sellerId": 2,
        "totalPrice": "7.50",
        "deliveryAddress": "Rua da Pinga",
        "deliveryNumber": "4",
        "saleDate": "2021-11-25T08:09:20.000Z",
        "status": "Pendente",
        "createdAt": "2021-11-25T08:09:20.000Z",
        "updatedAt": "2021-11-25T08:09:20.000Z",
        "products": [
            {
                "id": 2,
                "name": "Heineken 600ml",
                "price": "7.50",
                "stock": 4,
                "urlImage": "http://localhost:3367/images/heineken_600ml.jpg",
                "SalesProduct": {
                    "saleId": 1,
                    "productId": 2,
                    "quantity": 1
                }
            }
        ]
    }
]
```
