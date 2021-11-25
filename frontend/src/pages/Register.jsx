import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../hooks/context';

const axios = require('axios').default;

function RegisterUser() {
  const [userData, setUserData] = useState({
    name: '', email: '', cpf: '', password: ''
  })
  const { setUserInLocalStorage } = useContext(AppContext);
  const router = useHistory();

  const PASSWORD_LENGTH_EXPECTED = 6;
  const NAME_LENGTH_EXPECTED = 12;
  const CPF_LENGTH_EXPECTED = 11;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
  };

  function validateEmail(emailValue) {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return re.test(String(emailValue).toLowerCase());
  }

  const isValid = () => {
    const validatedEmail = validateEmail(userData.email);
    const validatedPassword = userData.password.length >= PASSWORD_LENGTH_EXPECTED;
    const validatedName = userData.name.length >= NAME_LENGTH_EXPECTED;
    const validatedCpf = userData.cpf.length >= CPF_LENGTH_EXPECTED;

    return validatedEmail && validatedPassword && validatedName && validatedCpf;
  };

  const submitUser = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3367/customer/register', userData).then((response) => {
      console.log(response);
      setUserInLocalStorage(response.data);
      router.push('customer/products');
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <div className="Login--main">
      <form className="Login--main--form">
        <h1>Cadastro</h1>
        <label htmlFor="name-input">
          <input
            type="text"
            id="name-input"
            name="name"
            onChange={ handleChange }
            data-testid="common_register__input-name"
            className="name-input input"
            placeholder="Seu nome"
          />
          Nome com minimo 12 letras
        </label>
        <br />
        <label htmlFor="email-input">
          <input
            type="email"
            id="email-input"
            name="email"
            onChange={ handleChange }
            data-testid="common_register__input-email"
            className="email-input input"
            placeholder="seu-email@site.com.br"
          />
        </label>
        <br />
        <label htmlFor="cpf-input">
          <input
            type="text"
            id="cpf-input"
            name="cpf"
            onChange={ handleChange }
            data-testid="common_register__input-password"
            className="name-input input"
            placeholder="76532145680"
          />
          CPF 11 digitos
        </label>
        <br />
        <label htmlFor="password-input">
          <input
            type="password"
            id="password-input"
            name="password"
            onChange={ handleChange }
            data-testid="common_register__input-password"
            className="password-input input"
            placeholder="***********"
          />
          Senha de 6 digitos
        </label>
        <br />
        <button
          className="button-register button is-warning"
          type="button"
          onClick={ submitUser }
          disabled={ !isValid() }
          data-testid="common_register__button-register"
        >
          Cadastrar
        </button>
        {/* <p
          data-testid="common_register__element-invalid_register"
        >
          Elemento oculto (mensagem de erro)
        </p> */}
      </form>
    </div>
  );
}

export default RegisterUser;
