const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
