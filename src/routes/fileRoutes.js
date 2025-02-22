const express = require("express");
const { processFile } = require("../controllers/fileController");
const upload = require("../utils/fileHandler");

const router = express.Router();

router.post("/upload", upload.single("file"), processFile);

module.exports = router;
