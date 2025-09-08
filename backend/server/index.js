// POST /api/auth/register

// POST /api/auth/login

// POST /api/orders

// POST /api/orders/payhere/notify ✅ needed for PayHere

// GET /api/orders/:userId ✅ for user history



require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const orderRoutes = require("../routes/orders");

//database connection
connectDB();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes);
app.use("api/orders",orderRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));

const crypto = require("crypto");

// PayHere Notify URL
app.post("/payhere/notify", (req, res) => {
  const {
    merchant_id,
    order_id,
    payhere_amount,
    payhere_currency,
    status_code,
    md5sig
  } = req.body;

  console.log("🔔 PayHere Notification:", req.body);

  // Compute local md5 signature
  const localMd5 = crypto
    .createHash("md5")
    .update(
      merchant_id +
        order_id +
        payhere_amount +
        payhere_currency +
        status_code +
        crypto.createHash("md5").update(process.env.MERCHANT_SECRET).digest("hex").toUpperCase()
    )
    .digest("hex")
    .toUpperCase();

  if (localMd5 === md5sig && status_code === "2") {
    console.log("✅ Payment verified for Order:", order_id);

  } else {
    console.log("❌ Invalid payment or hash mismatch for Order:", order_id);
  }

  res.sendStatus(200); // ✅ Always return 200 to PayHere
});




