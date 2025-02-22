require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
const fileRoutes = require("./src/routes/fileRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/files", fileRoutes);

connectDB();

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
