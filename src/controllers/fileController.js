const ExtractedText = require("../models/extractedTextModel");
const { extractTextFromPDF, extractTextFromImage } = require("../services/extractTextService");

const processFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    
    if (!["application/pdf", "image/jpeg", "image/png"].includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Invalid file format. Upload PDF or Image" });
    }
    
    const { path, mimetype, originalname } = req.file;
    let extractedText = "";

    if (mimetype === "application/pdf") {
      extractedText = await extractTextFromPDF(path);
    } else if (mimetype.startsWith("image/")) {
      extractedText = await extractTextFromImage(path);
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    const newEntry = await ExtractedText.create({
      filename: originalname,
      type: mimetype.includes("pdf") ? "pdf" : "image",
      extractedText,
    });

    res.status(200).json({ message: "File processed successfully", data: newEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { processFile };
