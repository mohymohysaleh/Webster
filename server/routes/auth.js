const express = require('express');
const axios = require('axios');
const User = require('../models/user');
const jwt = require('../utils/jwt');
const verifyRefreshToken = require('../middleware/verifyToken');
const router = express.Router();
require('dotenv').config();

router.get('/login', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/auth?` +
    `response_type=code&` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${process.env.FRONTEND_URL}/auth/google/callback&` +
    `scope=openid%20profile%20email`;

  res.json({ login_url: url });
});

router.post('/google/callback', async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.FRONTEND_URL}/auth/google/callback`,
      grant_type: 'authorization_code'
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const { sub, email, name } = userResponse.data;

    let user = await User.findOne({ google_sub: sub });

    if (!user) {
      user = await User.create({
        google_sub: sub,
        email,
        name,
        role: 'user'
      });
    }

    const refreshToken = jwt.createRefreshToken({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      sub: user.google_sub
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.json({
      message: 'Logged in',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Google OAuth error:', err.response?.data || err.message);
    res.status(500).json({ error: 'OAuth callback failed' });
  }
});

router.get('/me', verifyRefreshToken, async (req, res) => {
  try {
    console.log('User data in /me route:', req.user);
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.patch('/update-profile', verifyRefreshToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    
    // Validate input
    if (name && (typeof name !== 'string' || name.length < 1)) {
      return res.status(400).json({ error: 'Name must be a valid string' });
    }
    
    // Find and update the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update fields if provided
    if (name) {
      user.name = name;
    }
    
    // Save the updated user
    await user.save();
    
    // Generate new token with updated information
    const refreshToken = jwt.createRefreshToken({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      sub: user.google_sub
    });

    // Update the cookie
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    
    // Return the updated user
    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax'
  });
  res.json({ message: 'Logged out' });
});

module.exports = router; 