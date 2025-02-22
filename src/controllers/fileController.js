const ExtractedText = require("../models/extractedTextModel");
const { extractTextFromPDF, extractTextFromImage } = require("../services/extractTextService");

const processFile = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    // Validate the file type
    if (!["application/pdf", "image/jpeg", "image/png"].includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file format. Upload PDF or Image" });
    }
    
    const { path, mimetype, originalname } = req.file;
    let extractedText = "";

    // Extract text based on file type
    if (mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(path);
    } else if (mimetype.startsWith("image/")) {
      extractedText = await extractTextFromImage(path);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    // Create a new entry in the database
    const newEntry = await ExtractedText.create({
      filename: originalname,
      type: mimetype.includes("pdf") ? "pdf" : "image",
      extractedText,
    });

    // Send a success response
    res.status(200).json({ message: "File processed successfully", data: newEntry });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

// Export the processFile function
module.exports = { processFile };
