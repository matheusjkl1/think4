const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const CustomerController = require('../../src/controllers/CustomerController');
const CustomerService = require('../../src/services/CustomerService');
const { NOT_FOUND } = require('../../src/utils/statusCode');

chai.use(spies);
describe('Customer Controller - Ao chamar o controller de login', () => {
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
      sinon.stub(CustomerService, 'loginCustomer')
        .resolves({});
    });

    after(() => {
      CustomerService.loginCustomer.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await CustomerController.LoginCustomer(request, response, next);

      expect(next).to.have.been.called.with({
        statusCode: NOT_FOUND,
        message: 'not_found',
      });
    });
  });

  // describe('quando é inserido com sucesso', () => {
  //   const response = {};
  //   const request = {};
  //   const next = chai.spy((err) => err);

  //   before(() => {
  //     request.body = {
  //       username: 'jojoalbertin',
  //       password: 'aviao789123',
  //     };

  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.json = sinon.stub()
  //       .returns();

  //     sinon.stub(CustomerService, 'loginCustomer')
  //       .resolves(true);
  //   });

  //   after(() => {
  //     CustomerService.loginCustomer.restore();
  //   });
  //   it('é chamado o status com o código 200', async () => {
  //     await CustomerController.LoginCustomer(request, response, next);

  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //   });
  // });
});
