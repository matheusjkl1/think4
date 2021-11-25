const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const CustomerController = require('../../src/controllers/CustomerController');
const CustomerService = require('../../src/services/CustomerService');
const { BAD_REQUEST } = require('../../src/utils/statusCode');
const generateRandomEmail = require('./randomGmail');

chai.use(spies);
describe('Customer Controller - Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      sinon.stub(CustomerService, 'registerCustomer')
        .resolves(false);
    });

    after(() => {
      CustomerService.registerCustomer.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await CustomerController.RegisterCustomer(request, response, next);

      expect(next).to.have.been.called.with({
        statusCode: BAD_REQUEST,
        message: 'error_when_registering',
      });
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {
        name: 'Joao Alberto Cunha',
        cpf: '12378945680',
        email: generateRandomEmail(),
        password: 'aviao789123',
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(CustomerService, 'registerCustomer')
        .resolves(true);
    });

    after(() => {
      CustomerService.registerCustomer.restore();
    });
    it('é chamado o status com o código 201', async () => {
      await CustomerController.RegisterCustomer(request, response, next);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});
