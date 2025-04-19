const jwt = require('../utils/jwt');
const User = require('../models/user');

const verifyRefreshToken = async (req, res, next) => {
  const token = req.cookies.refresh_token;

  if (!token) {
    return res.status(401).json({ detail: 'Missing refresh token' });
  }

  const payload = jwt.verifyToken(token);
  if (!payload) {
    return res.status(403).json({ detail: 'Invalid or expired token' });
  }

  req.user = payload;
  next();
};

module.exports = verifyRefreshToken; 