import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../hooks/context';
import '../css/Login.css';
import 'bulma/css/bulma.css';

const axios = require('axios').default;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notFoundError, setNotFoundError] = useState(false);
  const { setUser, setUserInLocalStorage } = useContext(AppContext);
  const router = useHistory();

  useEffect(() => {
    const verifyToken = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      try {
        await axios.get('http://localhost:3367/login', {
          headers: { authorization: user.token },
        });

        router.push('/customer/products');
      } catch (error) {
        console.error(error);
      }
    };
    verifyToken();
  }, []);

  const PASSWORD_LENGTH_EXPECTED = 6;

  const handleChange = ({ target }) => {
    if (target.name === 'email') {
      return setEmail(target.value);
    }

    return setPassword(target.value);
  };

  function validateEmail(emailValue) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(emailValue).toLowerCase());
  }

  const isValid = () => {
    const validatedEmail = validateEmail(email);
    const validatedPassword = password.length >= PASSWORD_LENGTH_EXPECTED;

    return validatedEmail && validatedPassword;
  };

  const createInput = (name, title) => (
    <div className="Login--main--form Login--main--form--padding">
      <label htmlFor={ name }>{ title }</label>
      <input
        id={ name }
        name={ name }
        type={ name }
        onChange={ handleChange }
        data-testid={ `common_login__input-${name}` }
        className="input"
      />
    </div>
  );

  const loginFunction = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3367/customer/login', {
      email,
      password,
    }).then((response) => {
      setUser(response.data);
      setUserInLocalStorage(response.data);
      if (response.data.role === 'customer') {
        router.push('customer/products');
      }
    }).catch(() => {
      setNotFoundError(true);
    });
  };

  return (
    <div className="Login--main">
      <form id="form" className="Login--main--form">
        { createInput('email', 'Login') }
        { createInput('password', 'Senha') }
        <button
          type="submit"
          disabled={ !isValid() }
          onClick={ loginFunction }
          data-testid="common_login__button-login"
          className="button is-primary Login--main--form--padding"
        >
          Login
        </button>
        <button
          type="button"
          data-testid="common_login__button-register"
          className="button button-register Login--main--form--padding is-warning"
          onClick={ () => (router.push('/register')) }
        >
          Ainda não tenho conta
        </button>
      </form>
      {notFoundError
        ? <p data-testid="common_login__element-invalid-email">O usuário não existe</p>
        : null}
    </div>
  );
}

export default Login;
