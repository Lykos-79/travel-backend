// server/routes/trips.js
const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// GET all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET trip by ID
router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
