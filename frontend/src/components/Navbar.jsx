import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// import { string } from 'prop-types';
import './css/navbar.css';

function Navbar() {
  const [username, setUsername] = useState();

  const router = useHistory();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { name } = JSON.parse(localStorage.getItem('user'));
      setUsername(name)
    }

  }, [])

  const handleClick = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <nav className="navbar">
      <div>
        <a
          data-testid="customer_products__element-navbar-link-products"
          href="/customer/products"
        >
          Produtos
        </a>
      </div>
      <div>
        <Link
          data-testid="customer_products__element-navbar-link-orders"
          to='/customer/orders'
        >
          <a
            data-testid="customer_products__element-navbar-link-orders"
            href='/customer/orders'
          >
            Meus Pedidos
          </a>
        </Link>
      </div>
      <div data-testid="customer_products__element-navbar-user-full-name">
        <p>
          {username}
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleClick }
          className="button"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
