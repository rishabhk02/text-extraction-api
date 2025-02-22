// Importing the required packages
require("dotenv").config(); // For loading environment variables from .env file
const express = require("express"); // Express framework for building web applications
const cors = require("cors"); // Middleware for enabling Cross-Origin Resource Sharing
const connectDB = require("./src/config/db"); // Custom module for database connection
const fileRoutes = require("./src/routes/fileRoutes"); // Custom module for file-related routes

const app = express();

// Middleware to enable CORS and parse incoming JSON requests
app.use(cors());
app.use(express.json());

// Define the routes for file-related operations
app.use("/api/files", fileRoutes);

// Connect to MongoDB database
connectDB();

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ error: err.message }); // Send a JSON response with the error message
});

const PORT = process.env.PORT || 5000; // Use the port defined in .env or default to 5000

// Start the Express server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
