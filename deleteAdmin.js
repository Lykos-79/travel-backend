const mongoose = require("mongoose");
require("dotenv").config();

const Admin = require("./models/Admin");

const deleteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const res = await Admin.deleteOne({ username: "admin" });

    if (res.deletedCount > 0) {
      console.log("✅ Admin deleted successfully");
    } else {
      console.log("❌ Admin not found");
    }

    process.exit();
  } catch (err) {
    console.error("❌ Error deleting admin:", err);
    process.exit(1);
  }
};

deleteAdmin();
