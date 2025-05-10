require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const callbackRoutes = require("./routes/callback");
const contactRoute = require("./routes/contact");

app.use(cors());
app.use(express.json());
app.use("/api/callback", callbackRoutes);
app.use("/api/contact", contactRoute);

app.listen(5000, () => console.log("Server started on port 5000"));
