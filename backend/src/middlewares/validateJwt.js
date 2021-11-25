const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('fs')
  .readFileSync(
    path.join(__dirname, '..', '..', 'jwt.evaluation.key'),
    { encoding: 'utf-8' },
  ).trim();

const { User } = require('../database/models');

const { UNAUTHORIZED } = require('../utils/statusCode');

module.exports = async (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) return next({ statusCode: UNAUTHORIZED, message: 'Token not found' });

  const payload = jwt.verify(token, SECRET_KEY, (err, result) => ({ err, result }));
  if (payload.err) {
    return next({
      statusCode: UNAUTHORIZED,
      message: payload.err,
    });
  }
  console.log(payload);

  // faz a busca do usuario para validar se o token pertence a um usuario cadastrado.
  const user = await User.findByPk(payload.result.userId);

  if (!user) return next({ statusCode: UNAUTHORIZED, message: 'Invalid Token' });

  req.user = user.id;

  return next();
};
