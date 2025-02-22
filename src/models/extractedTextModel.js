const mongoose = require("mongoose");

// Defining schema to store the extracted text
const ExtractedTextSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  type: { type: String, enum: ["pdf", "image"], required: true },
  extractedText: { type: String, required: true }, 
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ExtractedText", ExtractedTextSchema);
