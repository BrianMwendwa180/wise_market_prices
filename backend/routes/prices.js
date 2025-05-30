const express = require('express');
const router = express.Router();

const prices = [];

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

// Get all prices (with optional filtering)
router.get('/', (req, res) => {
  // For simplicity, ignoring filtering implementation here
  res.json(prices);
});

// Get recent prices
router.get('/recent', (req, res) => {
  // Return last 10 prices as recent
  const recentPrices = prices.slice(-10);
  res.json(recentPrices);
});

// Get price trends for a product
router.get('/trends/:productName', (req, res) => {
  const { productName } = req.params;
  // For simplicity, return all prices for the product
  const productPrices = prices.filter(p => p.productName === productName);
  res.json(productPrices);
});

// Get price by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const price = prices.find(p => p.id === id);
  if (!price) {
    return res.status(404).json({ message: 'Price not found' });
  }
  res.json(price);
});

// Create a new price (protected)
router.post('/', authenticateToken, (req, res) => {
  const { productName, price, categoryId } = req.body;
  if (!productName || !price) {
    return res.status(400).json({ message: 'Product name and price are required' });
  }
  const newPrice = {
    id: prices.length + 1,
    productName,
    price,
    categoryId: categoryId || null,
    createdBy: req.user.id,
    createdAt: new Date()
  };
  prices.push(newPrice);
  res.status(201).json(newPrice);
});

// Update a price (protected)
router.put('/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const price = prices.find(p => p.id === id);
  if (!price) {
    return res.status(404).json({ message: 'Price not found' });
  }
  const { productName, price: newPrice, categoryId } = req.body;
  if (productName !== undefined) price.productName = productName;
  if (newPrice !== undefined) price.price = newPrice;
  if (categoryId !== undefined) price.categoryId = categoryId;
  res.json(price);
});

// Delete a price (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = prices.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Price not found' });
  }
  prices.splice(index, 1);
  res.json({ message: 'Price deleted' });
});

module.exports = router;
