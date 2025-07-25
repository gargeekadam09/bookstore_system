const express = require('express');
const app = express();
const cors = require('cors');


const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

// Middleware
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials: true
}));

//routes
const bookRoutes = require('./src/books/book.route');
app.use("/api/books", bookRoutes);

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
  app.listen(port, () => {
    console.log(`Book Store app listening on port ${port}`);
  });
}).catch(err => console.log(err));

// Server is started in the main() promise chain