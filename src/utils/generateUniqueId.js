// importa biblioteca para criar id criptografado
const crypto = require('crypto')

module.exports = function generateUniqueId() {
  return crypto.randomBytes(4).toString('HEX')
}