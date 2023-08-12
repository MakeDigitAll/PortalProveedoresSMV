const  bcrypt  = require('bcryptjs');
const crypto = require('crypto');
const { token } = require('../config');


async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    throw new Error('Error al encriptar la contraseña');
  }
}

async function verifyPassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error(`Error al verificar la contraseña: ${error.message}`);
  }
}



const iv = crypto.randomBytes(16);
const encryptKey = crypto.randomBytes(32);


function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Función para desencriptar la cadena
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}



module.exports = {
    encryptPassword,
    verifyPassword,
    encrypt,
    decrypt
}