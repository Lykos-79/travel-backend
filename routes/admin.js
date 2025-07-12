const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Admin login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🟡 Incoming login request:");
  console.log("Username:", username);
  console.log("Password:", password);

  try {
    const admin = await Admin.findOne({ username });
    console.log("🟢 Found Admin:", admin);

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🧪 Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("✅ Token created:", token);

    res.json({ token });
  } catch (err) {
    console.error("❌ Error during login:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
