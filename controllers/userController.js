const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model is defined



const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({ msg: 'Login failed. Please try again later.' });
  }
};


const forgotPassword = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Check if user exists with username and email
    let user = await User.findOne({ username, email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Implement your logic for sending a password reset link
    // This example doesn't include actual email sending logic
    // You can generate a unique reset token and send it via email

    res.status(200).json({ msg: 'Password reset link has been sent to your email' });

  } catch (err) {
    console.error('Error during forgot password:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
};
