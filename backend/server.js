const express = require("express");

const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
const cors = require("cors");

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api", require("./routes/aiRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});