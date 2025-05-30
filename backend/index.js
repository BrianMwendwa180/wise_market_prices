const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = 'your_jwt_secret_key'; // In production, use environment variables

app.use(cors());
app.use(express.json());

// Import routes
const pricesRouter = require('./routes/prices');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users');

// Authentication Endpoints remain here
const bcrypt = require('bcryptjs');

const users = [];

(async () => {
  const hashedPassword = await bcrypt.hash('password', 10);
  users.push({ id: 1, username: 'admin', password: hashedPassword, role: 'admin' });
})();

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

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

// Register a new user
app.post('/api/auth/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword, role: role || 'user' };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login a user
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for username:', username);
  console.log('Current users:', users);
  const user = users.find(u => u.username === username);
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  console.log('Password valid:', validPassword);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Get current user profile (protected)
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ id: user.id, username: user.username, role: user.role });
});

// Use routers for other endpoints
app.use('/api/prices', pricesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const startServer = async () => {
  const hashedPasswordAdmin = await bcrypt.hash('password', 10);
  users.push({ id: 1, username: 'admin', password: hashedPasswordAdmin, role: 'admin' });

  const hashedPasswordUser = await bcrypt.hash('1234', 10);
  users.push({ id: 2, username: 'user1', password: hashedPasswordUser, role: 'user' });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
