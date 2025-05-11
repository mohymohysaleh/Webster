const jwt = require('jsonwebtoken');

const createRefreshToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.JWT_Algorithm || 'HS256',
    expiresIn: '30d'
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return null;
  }
};


module.exports = {
  createRefreshToken,
  verifyToken
};
