const crypto = require('crypto');

function hashPassword(password, saltLength = 16, iterations = 100000, keylen = 64, digest = 'sha512') {
  const salt = crypto.randomBytes(saltLength).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  return `${salt}:${hash}`; // store as "salt:hash"
}

function comparePasswords(password, storedPassword) {
  const [salt, originalHash] = storedPassword.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512');
  const originalBuffer = Buffer.from(originalHash, 'hex');
  return crypto.timingSafeEqual(hash, originalBuffer);
}
