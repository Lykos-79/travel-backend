// const mongoose = require("mongoose");

// const TripSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     location: { type: String, required: true },
//     duration: { type: String, required: true },
//     price: { type: Number, required: true },
//     image: { type: String, required: true },
//     category: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Trip", TripSchema);

const mongoose = require("mongoose");

const DayWisePlanSchema = new mongoose.Schema({
  day: String,
  title: String,
  content: [String],
});

const TripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  price: Number,
  multiPrice: {
    quad: Number,
    triple: Number,
    twin: Number,
  },
  priceOnRequest: {
    type: Boolean,
    default: false,
  },
  image: String,
  inclusions: [String],
  exclusions: [String],
  dayWisePlan: [DayWisePlanSchema],
  category: String, // Optional: "honeymoon", "trek", "international", etc.
});

module.exports = mongoose.model("Trip", TripSchema);
