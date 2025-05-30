const express = require('express');
const router = express.Router();

const users = [];

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  const jwt = require('jsonwebtoken');
  const JWT_SECRET = 'your_jwt_secret_key';
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Middleware to check admin role
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
}

// Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  const safeUsers = users.map(u => ({ id: u.id, username: u.username, role: u.role }));
  res.json(safeUsers);
});

// Get user by ID (protected)
router.get('/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ id: user.id, username: user.username, role: user.role });
});

// Update a user (protected)
router.put('/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { username, role } = req.body;
  if (username !== undefined) user.username = username;
  if (role !== undefined && req.user.role === 'admin') user.role = role; // Only admin can change role
  res.json({ id: user.id, username: user.username, role: user.role });
});

// Delete a user (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  if (req.user.id !== id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

module.exports = router;
