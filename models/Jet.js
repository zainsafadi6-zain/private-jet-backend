import mongoose from "mongoose";

const jetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Light", "Midsize", "Heavy", "Ultra-Long-Range"],
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    range: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Jet", jetSchema);