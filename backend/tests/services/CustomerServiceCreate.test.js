const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('../../src/database/models');
const CustomerService = require('../../src/services/CustomerService');
const generateRandomEmail = require('../controllers/randomGmail');

describe('Customer Service - Insere um novo Customer no BD', () => {
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
      const response = await CustomerService.registerCustomer(payloadCustomer);
      expect(response).to.be.equal(false);
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
      sinon.stub(User, 'create')
        .resolves({
          dataValues: {
            name: 'Aderbar Pereira Santos',
            email: 'santos@cap.com',
            cpf: '12378945680',
            role: 'customer',
            updatedAt: '2021-11-24T22:07:01.691Z',
            createdAt: '2021-11-24T22:07:01.691Z',
            id: 4,
          },
        });
    });

    after(() => {
      User.create.restore();
    });

    it('retorna um objeto e tal objeto possui o "token" do novo Customer inserido', async () => {
      const response = await CustomerService.registerCustomer(payloadCustomer);

      expect(response).to.have.a.property('token');
    });
  });
});
