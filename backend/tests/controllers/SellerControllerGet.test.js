const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const SellerController = require('../../src/controllers/SellerController');
const SellerService = require('../../src/services/SellerService');
const { NOT_FOUND, OK } = require('../../src/utils/statusCode');

chai.use(spies);
describe('Seller Controller - Ao chamar o controller de getSellers', () => {
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
      sinon.stub(SellerService, 'findSeller')
        .resolves(false);
    });

    after(() => {
      SellerService.findSeller.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await SellerController.getSellers(request, response, next);

      expect(next).to.have.been.called.with({
        statusCode: NOT_FOUND,
        message: 'Seller Not Found',
      });
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SellerService, 'findSeller')
        .resolves(true);
    });

    after(() => {
      SellerService.findSeller.restore();
    });
    it('é chamado o status com o código 200', async () => {
      await SellerController.getSellers(request, response, next);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });
  });
});
