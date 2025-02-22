const express = require("express"); // Importing the Express framework
const { processFile } = require("../controllers/fileController"); // Importing the processFile controller
const upload = require("../utils/fileHandler"); // Importing the Multer file handling middleware
const router = express.Router(); // Creating a new Express router instance

// POST route to handle file upload
// 'upload.single("file")' is the middleware that handles the file upload
// 'processFile' is the controller that processes the uploaded file
router.post("/upload", upload.single("file"), processFile);

// Exporting the router to be used in other parts of the application
module.exports = router;

