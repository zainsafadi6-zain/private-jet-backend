import express from "express";
import Jet from "../models/Jet.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all jets
router.get("/", async (req, res) => {
  try {
    const jets = await Jet.find().sort({ createdAt: -1 });
    res.json(jets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jets" });
  }
});

// Get one jet
router.get("/:id", async (req, res) => {
  try {
    const jet = await Jet.findById(req.params.id);

    if (!jet) {
      return res.status(404).json({ message: "Jet not found" });
    }

    res.json(jet);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jet" });
  }
});

// Create jet - admin only
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const jet = await Jet.create(req.body);
    res.status(201).json(jet);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create jet",
      error: error.message,
    });
  }
});

// Update jet - admin only
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const jet = await Jet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!jet) {
      return res.status(404).json({ message: "Jet not found" });
    }

    res.json(jet);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update jet",
      error: error.message,
    });
  }
});

// Delete jet - admin only
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const jet = await Jet.findByIdAndDelete(req.params.id);

    if (!jet) {
      return res.status(404).json({ message: "Jet not found" });
    }

    res.json({ message: "Jet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete jet" });
  }
});

export default router;