require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const callbackRoutes = require("./routes/callback");
const contactRoute = require("./routes/contact");
const tripRoutes = require("./routes/trips");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.use(cors());

app.use(express.json());
app.use("/api/admin", adminRoutes);
app.use("/api/callback", callbackRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/trips", tripRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));
