import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../hooks/context';
import Navbar from '../components/Navbar';
import 'bulma/css/bulma.css';
import '../css/Checkout.css';

function Checkout() {
  const {
    sendSale,
    getSellersId,
    sellersId,
    productsCart,
    verifyUser,
    updateFilteredCart,
    filteredCart,
    setFilteredCart,
  } = useContext(AppContext);

  useEffect(() => {
    verifyUser();
    updateFilteredCart();
  }, []);

  useEffect(() => {
    getSellersId();
  }, [getSellersId]);

  const INITIAL_STATE = {
    sellerId: 2,
    deliveryAddress: '',
    deliveryNumber: '',
    productsCart,
  };

  const [detailsForm, setDetailsForm] = useState(INITIAL_STATE);
  let total = 0;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDetailsForm({ ...detailsForm, [name]: value });
  };

  const handleOptionsChange = ({ target }) => {
    const { name, value } = target;
    setDetailsForm({ ...detailsForm, [name]: value });
  };

  const handleSubmit = (e, totalPriceString) => {
    e.preventDefault();
    const totalPrice = Number(totalPriceString);
    setDetailsForm({ ...detailsForm });
    const dataSend = detailsForm;

    sendSale({ ...dataSend, totalPrice, productCart: filteredCart });
  };

  const itemNumber = (index) => {
    index += 1;
    return index;
  };

  const calcTotalPrice = (subtotal) => {
    total += subtotal;
  };

  const formatPrice = (price) => price.replace(/\./ig, ',');
  const reformatPrice = (price) => price.replace(/,/ig, '.');

  const calcSubTotal = (price, quantity) => {
    const subtotal = Number(price * quantity);
    calcTotalPrice(subtotal);
    return formatPrice(subtotal.toFixed(2));
  };

  const removeItem = (name) => {
    const cartStorage = JSON.parse(localStorage.getItem('productCart'));
    cartStorage[name].quantity = 0;
    localStorage.setItem('productCart', JSON.stringify(cartStorage));
    const itemToRemove = filteredCart.filter((item) => item.name === name);
    total -= Number(itemToRemove.price * itemToRemove.quantity);

    const newFilteredCart = filteredCart.filter((item) => item.name !== name);
    setFilteredCart(newFilteredCart);
  };

  const createSpan = (dataTestId, value) => (
    <span
      data-testid={ `customer_checkout__element-order-table-${dataTestId}` }
      className="span--checkout"
    >
      {value}
    </span>
  );

  return (
    <div className="main">
      <Navbar />
      <section className="productsContainer">
        <div className="box">
          <h3>Checkout do Pedido</h3>
        </div>
        <div>
          { filteredCart.map(({ name, price, quantity }, index) => (
            <div
              key={ name }
              data-testid={ `element-order-table-name-${index}` }
              className="box Checkout--products"
            >
              { createSpan(`item-number-${index}`, itemNumber(index)) }
              { createSpan(`name-${index}`, name) }
              { createSpan(`quantity-${index}`, quantity) }
              { createSpan(`unit-price-${index}`, formatPrice(price)) }
              { createSpan(`sub-total-${index}`, calcSubTotal(price, quantity)) }
              <button
                type="button"
                onClick={ () => removeItem(name) }
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                className="button is-danger remove-btn"
              >
                Remover
              </button>
            </div>))}
        </div>
        <div
          data-testid="customer_checkout__element-order-total-price"
          className="box total-price notification is-success is-light"
        >
          <h3>
            {`Valor Total do Pedido: ${formatPrice(total.toFixed(2))}`}
          </h3>
        </div>
      </section>
      <section className="formCheckoutContainer box">
        <h3>Detalhes e Endereço para entrega</h3>
        <form className="Login--main--form">
          <select
            id="sellerId"
            name="sellerId"
            value={ detailsForm.sellerId }
            data-testid="customer_checkout__select-seller"
            onChange={ handleOptionsChange }
            className="select forms"
          >
            {sellersId.map(({ id, name }) => (
              <option key={ id } value={ id }>{ name }</option>
            ))}
          </select>
          <input
            type="text"
            data-testid="customer_checkout__input-address"
            placeholder="Seu endereço"
            value={ detailsForm.deliveryAddress }
            onChange={ handleChange }
            name="deliveryAddress"
            className="input forms"
          />
          <input
            type="number"
            data-testid="customer_checkout__input-addressNumber"
            placeholder="Número da casa"
            value={ detailsForm.deliveryNumber }
            onChange={ handleChange }
            name="deliveryNumber"
            className="input forms"
          />

          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (e) => handleSubmit(e, reformatPrice(total.toFixed(2))) }
            className="button is-warning forms"
          >
            Finalizar Pedido
          </button>
        </form>
      </section>
    </div>
  );
}

export default Checkout;
