const multer = require("multer");

// Defining the Multer storage configuration for file upload handling
const storage = multer.diskStorage({
  // Specify the destination directory for uploaded files
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  // Define the filename format to include a timestamp for uniqueness
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

// Validation function to allow only predefined file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true) // Accept the file if it is of an allowed type
    : cb(new Error("Invalid file type"), false); // Reject the file if it is not an allowed type
};

// Multer middleware for file handling with storage and file type validation
const upload = multer({ storage, fileFilter });

// Exporting the middleware to be used in other parts of the application
module.exports = upload;
