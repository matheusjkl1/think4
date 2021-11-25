function generateRandomEmail() {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let string = '';
  for (let ii = 0; ii < 15; ii += 1) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }

  return `${string}@gmail.com`;
}

module.exports = generateRandomEmail;
