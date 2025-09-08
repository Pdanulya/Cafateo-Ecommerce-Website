const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Order = require("../models/order"); // import the Order model

// Create new order
router.post("/", auth, async (req, res) => {
  try {
    const { cart, total, paymentMethod } = req.body;
    const userId = req.user._id; // ✅ comes from token now

    let payhereOrderId = null;
    if (paymentMethod === "Online") {
      payhereOrderId = "ORD" + Date.now(); // unique ID for PayHere
    }

    const newOrder = new Order({
      userId,
      cart,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === "COD" ? "pending" : "initiated",
      payhereOrderId
    });

    const savedOrder = await newOrder.save();
    res.json({ orderId: savedOrder._id, payhereOrderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PayHere notify endpoint
router.post("/payhere/notify", async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig
    } = req.body;

    console.log("🔔 PayHere Notification:", req.body);

    // Recalculate hash
    const localMd5 = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          status_code +
          crypto
            .createHash("md5")
            .update(process.env.MERCHANT_SECRET)
            .digest("hex")
            .toUpperCase()
      )
      .digest("hex")
      .toUpperCase();

    if (localMd5 === md5sig && status_code === "2") {
      console.log("✅ Payment verified for Order:", order_id);
      await Order.findByIdAndUpdate(order_id, { paymentStatus: "paid" });
    } else {
      console.log("❌ Invalid payment or hash mismatch:", order_id);
      await Order.findByIdAndUpdate(order_id, { paymentStatus: "failed" });
    }

    res.sendStatus(200); // Always respond with 200 to PayHere
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
