// objeto com os status para melhorar a semantica do codigo
const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = statusCode;

// function romanize(num) {
//   if (isNaN(num)) { return NaN; }
//   const digits = String(+num).split('');
//   const key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
//     '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
//     '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
//   let roman = '';
//   let i = 3;
//   while (i--) { roman = (key[+digits.pop() + (i * 10)] || '') + roman; }
//   return Array(+digits.join('') + 1).join('M') + roman;
// }
