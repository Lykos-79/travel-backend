// server/models/Trip.js
const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  name: String,
  category: String, // e.g., "honeymoon", "trek", etc.
  price: Number,
  image: String, // URL or local path
  itinerary: [String], // array of day-wise plans
});

module.exports = mongoose.model("Trip", TripSchema);
