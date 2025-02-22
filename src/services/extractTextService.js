const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const formatText = (text) => {
  const lines = text.split("\n");
  let formattedText = "";

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.length > 40) {
      formattedText += `<h1>${trimmedLine}</h1>\n`; 
    } else if (trimmedLine.length > 20) {
      formattedText += `<h2>${trimmedLine}</h2>\n`; 
    } else {
      formattedText += `<p>${trimmedLine}</p>\n`; 
    }
  }

  return formattedText;
};

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return formatText(data.text);
};

const extractTextFromImage = async (filePath) => {
  const { data: { text } } = await Tesseract.recognize(filePath, "eng");
  return formatText(text);
};

module.exports = { extractTextFromPDF, extractTextFromImage };
