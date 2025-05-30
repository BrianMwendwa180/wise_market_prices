const express = require('express');
const router = express.Router();

const categories = [];

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

// Get all categories
router.get('/', (req, res) => {
  res.json(categories);
});

// Get category by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

// Create a new category (admin only)
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Category name is required' });
  }
  const newCategory = {
    id: categories.length + 1,
    name,
    description: description || ''
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// Update a category (admin only)
router.put('/:id', authenticateToken, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  const { name, description } = req.body;
  if (name !== undefined) category.name = name;
  if (description !== undefined) category.description = description;
  res.json(category);
});

// Delete a category (admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  categories.splice(index, 1);
  res.json({ message: 'Category deleted' });
});

module.exports = router;
