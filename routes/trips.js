const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const verifyToken = require("../middleware/verifyToken");

// ✅ CREATE — Protected
router.post("/", verifyToken, async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ READ — Public
router.get("/", async (req, res) => {
  try {
    const category = req.query.category;
    const query = category ? { category } : {};
    const trips = await Trip.find(query);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ READ by ID — Public
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE — Protected
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTrip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ DELETE — Protected
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.params.id);
    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
