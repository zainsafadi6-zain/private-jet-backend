import express from "express";
import Booking from "../models/Booking.js";
import Jet from "../models/Jet.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Client creates booking
router.post("/", protect, async (req, res) => {
  try {
    const {
      jet,
      departureCity,
      destinationCity,
      departureDate,
      passengers,
    } = req.body;

    const selectedJet = await Jet.findById(jet);

    if (!selectedJet) {
      return res.status(404).json({ message: "Jet not found" });
    }

    const booking = await Booking.create({
      client: req.user._id,
      jet,
      departureCity,
      destinationCity,
      departureDate,
      passengers,
      totalPrice: selectedJet.price,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create booking",
      error: error.message,
    });
  }
});

// Client views own bookings
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ client: req.user._id })
      .populate("jet")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your bookings" });
  }
});

// Admin views all bookings
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("client", "name email role")
      .populate("jet")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Admin updates booking status
router.put("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
      .populate("client", "name email")
      .populate("jet");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update booking status",
      error: error.message,
    });
  }
});

// Admin deletes booking
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

export default router;