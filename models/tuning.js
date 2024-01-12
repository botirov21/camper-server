const mongoose = require("mongoose");

const tuningSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    brand: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
    },
    licence: {
      type: String,
      required: true,
    },
    seats: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tuning", tuningSchema);    