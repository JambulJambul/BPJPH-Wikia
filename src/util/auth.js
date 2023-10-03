/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const secretKey = process.env.REACT_APP_JWT_SECRET || 'yourSecretKey'; // Replace with your actual secret key
const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

function generateToken() {
  return jwt.sign({ email: adminEmail }, secretKey, { expiresIn: '1h' });
}

function authenticate(email, password) {
  if (email === adminEmail && password === adminPassword) {
    const token = generateToken();
    return { success: true, token };
  }
  return { success: false, message: 'Invalid credentials' };
}

module.exports = { authenticate };
