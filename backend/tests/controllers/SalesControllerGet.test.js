const sinon = require('sinon');
const spies = require('chai-spies');
const chai = require('chai');
const { expect } = require('chai');
const SalesController = require('../../src/controllers');
const SalesService = require('../../src/services/SalesService');
const { NOT_FOUND, OK, CREATED } = require('../../src/utils/statusCode');

chai.use(spies);
describe('Sales Controller - Ao chamar o controller de getSales', () => {
  // describe('quando o payload informado não é válido', () => {
  //   const response = {};
  //   const request = {};
  //   const next = chai.spy((err) => err);

  //   before(() => {
  //     request.body = {};
  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.json = sinon.stub()
  //       .returns();
  //     sinon.stub(SalesService, 'checkoutNewSale')
  //       .resolves(false);
  //   });

  //   after(() => {
  //     SalesService.checkoutNewSale.restore();
  //   });

  //   it('é chamado o status com o código 400', async () => {
  //     await SalesController.sales(request, response, next);

  //     expect(next).to.have.been.called.with({
  //       statusCode: NOT_FOUND,
  //       message: 'Sales Not Found',
  //     });
  //   });
  // });

  // describe('quando é inserido com sucesso', () => {
  //   const response = {};
  //   const request = {};
  //   const next = chai.spy((err) => err);

  //   before(() => {
  //     request.body = {
  //       userId: 5,
  //       sellerId: 2,
  //       totalPrice: 2.2,
  //       deliveryAddress: 'Rua da Pinga',
  //       deliveryNumber: '51',
  //       status: 'Pendente',
  //       saleDate: new Date(),
  //       productCart: [{
  //         name: 'Skol Lata 250ml', quantity: 1, price: '2.20', stock: 5,
  //       }],
  //     };

  //     response.status = sinon.stub()
  //       .returns(response);
  //     response.json = sinon.stub()
  //       .returns();

  //     sinon.stub(SalesService, 'checkoutNewSale')
  //       .resolves(true);
  //   });

  //   after(() => {
  //     SalesService.checkoutNewSale.restore();
  //   });
  //   it('é chamado o status com o código 201', async () => {
  //     await SalesController.sales(request, response, next);

  //     expect(response.status.calledWith(CREATED)).to.be.equal(true);
  //   });
  // });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};
    const next = chai.spy((err) => err);

    before(() => {
      request.body = {};
      request.user = 1;
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(SalesService, 'getSales')
        .resolves(true);
    });

    after(() => {
      SalesService.getSales.restore();
    });
    it('é chamado o status com o código 200', async () => {
      await SalesController.sales(request, response, next);

      expect(response.status.calledWith(OK)).to.be.equal(true);
    });
  });
});
