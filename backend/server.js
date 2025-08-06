const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors);

app.options('*', cors());  // Allow preflight for all routes

// Optional: More explicit preflight headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // If it's a preflight request, respond with 200 immediately
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
// Import routes
const bookRoutes = require('./src/books/book.route');
const adminRoutes = require('./src/admin/admin.route');

// Use routes
app.use('/api/books', bookRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Book Store Server is running!');
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB Connected successfully');
    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });