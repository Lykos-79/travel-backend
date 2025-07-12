require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const callbackRoutes = require("./routes/callback");
const contactRoute = require("./routes/contact");
const tripRoutes = require("./routes/trips");
const adminRoutes = require("./routes/admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/callback", callbackRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/trips", tripRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 15000, // ⏱ increase timeout to avoid cold start failures
  })
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start server *only after DB is connected*
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  });
