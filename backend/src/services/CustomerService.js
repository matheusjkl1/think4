/* eslint-disable no-unused-vars */
require('dotenv').config();
// const { ObjectId } = require('mongodb');
const md5 = require('md5');
// const Customer = require('../models/CustomerModel');
const { User } = require('../database/models');
const generateToken = require('../utils/generateToken');
const { validateBody } = require('../utils/joisSchema');

const registerCustomer = async (customerData) => {
  if (!Object.keys(customerData).length) return false;

  // schema de validacao de campos obrigatorios
  const isValid = validateBody(customerData);

  if (isValid.error) return { error: isValid.error };

  const {
    name,
    email,
    cpf,
    password: passwordUser,
  } = customerData;

  // encriptacao da senha
  const passwordMd5 = md5(passwordUser);

  // valida se o usuario existe para nao duplicar dados no banco
  const checkUserAlreadyExists = await User.findAll({
    where: { email },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  if (checkUserAlreadyExists.length) return { error: 'already_registered_user' };

  const modelResponse = await User.create({
    name,
    email,
    cpf,
    password: passwordMd5,
    role: 'customer',
  });

  const { id, password, ...customerWithoutPassword } = modelResponse.dataValues;

  // gera um token utilizando o novo id registrado
  const token = generateToken(id);

  return { id, token, ...customerWithoutPassword };
};

const loginCustomer = async ({ email, password: passwordUser }) => {
  if (!email || !passwordUser) return { error: 'incorret_data_form' };

  // encripta a senha para consulta no banco de dados
  const passwordMd5 = md5(passwordUser);

  const checkUserAlreadyExists = await User.findOne({
    where: { email, password: passwordMd5 },
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });

  if (checkUserAlreadyExists.length) return { error: 'customer_not_found' };
  // remove a senha do objeto de retorno para nao expor dados sensiveis
  const { _id: id, password, ...customerWithoutPassword } = checkUserAlreadyExists.dataValues;

  //  gera um token para o usuario logado utilizando seu id
  const token = generateToken(id);

  return { ...customerWithoutPassword, id, token };
};

module.exports = {
  registerCustomer,
  loginCustomer,
};
