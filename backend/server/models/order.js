const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cart: [
    {
      name: String,
      price: String,
      quantity: Number,
      img: String
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" }, // order status: pending, delivered
  paymentMethod: { type: String, default: "COD" }, // COD or Online
  paymentStatus: { type: String, default: "pending" }, // payment status: pending, paid, failed
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
