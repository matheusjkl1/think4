const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../src/database/models');
const SellerService = require('../../src/services/SellerService');
const generateRandomEmail = require('../controllers/randomGmail');

describe('Seller Service - Busca vendedores no banco de dados', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadCustomer = {};
    before(() => {
      sinon.stub(User, 'findAll')
        .resolves(false);
    });

    // Restaurar a função `create` original após os testes.
    after(() => {
      User.findAll.restore();
    });

    it('Retorna um boolean que contém "false"', async () => {
      const response = await SellerService.findSeller(payloadCustomer);

      expect(response).to.have.a.property('error');
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payloadCustomer = {
      name: 'Ricardo Kishine',
      email: generateRandomEmail(),
      cpf: '12378945680',
      password: 'kiki7894123',
    };

    before(async () => {
      sinon.stub(User, 'findAll')
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
      User.findAll.restore();
    });

    it('retorna um objeto e tal objeto possui o "token" do novo Customer inserido', async () => {
      const response = await SellerService.findSeller(payloadCustomer);

      expect(response).to.have.a.property('dataValues');
    });
  });
});
