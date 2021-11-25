const Joi = require('joi');

function validateBody(body) {
  // schema para validacao dos dados na hora da criacao do usuario
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30)
      .required(),
    cpf: Joi.string().max(11)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(30)
      .required(),
  });

  const { value, error } = schema.validate(body);

  if (error) return { error: error.details[0].message };

  return value;
}
module.exports = {
  validateBody,
};
