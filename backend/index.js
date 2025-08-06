const express = require('express');
const app = express();
const cors = require('cors');


const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

// Middleware
app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        if (process.env.NODE_ENV === 'production') {
            // Allow requests from any Vercel deployment or no origin (mobile apps)
            if (!origin || origin.includes('vercel.app')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            // Allow localhost in development
            if (!origin || origin === 'http://localhost:5173') {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    },
    credentials: true
}));

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