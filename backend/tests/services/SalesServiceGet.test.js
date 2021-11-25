const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../src/database/models');
const SalesService = require('../../src/services/SalesService');
const generateRandomEmail = require('../controllers/randomGmail');

describe('Sales Service - cria uma nova venda no banco de dados', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadCustomer = {};
    before(() => {
      sinon.stub(User, 'create')
        .resolves(false);
    });

    // Restaurar a função `create` original após os testes.
    after(() => {
      User.create.restore();
    });

    it('Retorna um boolean que contém "false"', async () => {
      const response = await SalesService.checkoutNewSale(payloadCustomer);

      expect(response).to.have.a.property('error');
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payloadCustomer = {
      userId: 4,
      sellerId: 2,
      totalPrice: 7.5,
      deliveryAddress: 'Rua da Pinga',
      deliveryNumber: '2',
      status: 'Pendente',
      saleDate: '2021-11-25T07:35:44.902Z',
    };

    before(async () => {
      sinon.stub(User, 'create')
        .resolves({
          dataValues: {
            name: 'Aderbar Pereira Santos',
            email: generateRandomEmail(),
            cpf: '12378945680',
            role: 'seller',
            updatedAt: '2021-11-24T22:07:01.691Z',
            createdAt: '2021-11-24T22:07:01.691Z',
            id: 60,
          },
        });
    });

    after(() => {
      User.create.restore();
    });

    it('retorna um objeto e tal objeto possui o "token" do novo Customer inserido', async () => {
      const response = await SalesService.checkoutNewSale(payloadCustomer, [{
        name: 'Heineken 600ml', quantity: 1, price: '7.50', stock: 3,
      }]);

      expect(response).to.have.a.property('dataValues');
    });
  });
});
