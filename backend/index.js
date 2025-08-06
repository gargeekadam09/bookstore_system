const express = require('express');
const app = express();
const cors = require('cors');


const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

// Middleware
app.use(express.json());
// Temporarily disable CORS restrictions
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

//routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const adminRoutes = require('./src/admin/admin.route');


app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected successfully");
    
    // Define the root route
    app.get('/', (req, res) => {
      res.send('Book Store Server is running!');
    });
    
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

main().then(() => {
  // Server starts listening only after MongoDB connection is established
  if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`Book Store app listening on port ${port}`);
    });
  }
}).catch(err => console.log(err));

// Export app for Vercel
module.exports = app;