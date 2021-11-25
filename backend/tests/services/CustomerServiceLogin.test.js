const { expect } = require('chai');
const sinon = require('sinon');
const md5 = require('md5');

const { User } = require('../../src/database/models');
const CustomerService = require('../../src/services/CustomerService');

describe('Customer Service - Loga um Customer ja registrado no Banco de dados', () => {
  describe('quando os dados não são válidos', () => {
    const payloadCustomer = {};

    before(() => {
      sinon.stub(User, 'findOne')
        .resolves(null, null);
    });

    // Restauraremos a função `findUser` original após os testes.
    after(() => {
      User.findOne.restore();
    });
    it('retorna um erro', async () => {
      const response = await CustomerService.loginCustomer({
        username: payloadCustomer.username, password: payloadCustomer.password,
      });
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('error');
    });
  });
  describe('quando os dados são válidos', () => {
    const payloadCustomer = {
      name: 'Carlos Adalberto',
      email: 'adalshow@email.com',
      password: md5('carlinhos1516'),
    };

    const passwordNotEncrypt = 'carlinhos1516';

    before(async () => {
      sinon.stub(User, 'findOne')
        .resolves({
          dataValues: {
            name: 'Carlos Adalberto',
            email: 'adalshow@email.com',
            role: 'customer',
            updatedAt: '2021-11-24T22:07:01.691Z',
            createdAt: '2021-11-24T22:07:01.691Z',
            id: 4,
          },
        });
    });

    // Restauraremos a função `findUser` original após os testes.
    after(() => {
      User.findOne.restore();
    });

    it('retorna um token', async () => {
      // await CustomerService.registerCustomer(payloadCustomer);
      const response = await CustomerService.loginCustomer({
        email: payloadCustomer.email, password: passwordNotEncrypt,
      });
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('token');
    });
  });
});
