import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    require: true,
    min: 1,
  },
  price: {
    type: Number,
    require: true,
    default: 0,
  },
  images: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Supper = mongoose.model("Supper", schema);
