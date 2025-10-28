require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const staffRoutes = require("./routes/staffRoutes");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Kết nối MongoDB
connectDB();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// Sử dụng routes cho staff
app.use("/api/staff", staffRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
