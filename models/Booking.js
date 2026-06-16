import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    jet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jet",
      required: true,
    },

    departureCity: {
      type: String,
      required: true,
    },

    destinationCity: {
      type: String,
      required: true,
    },

    departureDate: {
      type: Date,
      required: true,
    },

    passengers: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);