const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

const adminData = {
  username: process.env.ADMIN_USER,
  password: process.env.ADMIN_PASS,
};

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // use simplified syntax

    // Check if admin already exists
    const existing = await Admin.findOne({ username: adminData.username });
    if (existing) {
      console.log("✅ Admin already exists.");
      return process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const newAdmin = new Admin({
      username: adminData.username,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("✅ Admin user created successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdminUser();
