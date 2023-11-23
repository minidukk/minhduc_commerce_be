const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);