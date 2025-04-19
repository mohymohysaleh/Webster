const jwt = require('../utils/jwt');
const User = require('../models/user');

const verifyRefreshToken = async (req, res, next) => {
  const token = req.cookies.refresh_token;
  console.log('Verifying token in middleware');

  if (!token) {
    console.log('Missing refresh token');
    return res.status(401).json({ detail: 'Missing refresh token' });
  }

  try {
    const payload = jwt.verifyToken(token);
    if (!payload) {
      console.log('Invalid or expired token');
      return res.status(403).json({ detail: 'Invalid or expired token' });
    }

    console.log('Token payload:', payload);
    
    // Add user info to request
    req.user = payload;
    
    // Verify user exists in database
    const user = await User.findById(payload.id);
    if (!user) {
      console.log('User not found in database');
      return res.status(404).json({ detail: 'User not found' });
    }
    
    console.log(`Authenticated user: ${user._id} (${user.role})`);
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ detail: 'Invalid or expired token' });
  }
};

module.exports = verifyRefreshToken; 