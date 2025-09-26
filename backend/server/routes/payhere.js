import express from "express";
import md5 from "crypto-js/md5.js";

const router = express.Router();

// Generate PayHere Hash
router.post("/generate-hash", (req, res) => {
  try {
    const { merchant_id, order_id, amount, currency } = req.body;

    const merchantSecret = process.env.MERCHANT_SECRET;

    // let merchantSecret  = 'NDAzNjk3MTUwODI3NzY0ODUwOTczNDk4ODk3OTAzNDc1NzMwMDcz';
    // let merchantId      = '1231899';
    // let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
    // let amountFormated  = parseFloat( total ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
    // let currency        = 'LKR';
    // let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

    // Hash the secret
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();

    // Format amount to 2 decimals
    const amountFormatted = parseFloat(amount)
      .toLocaleString("en-us", { minimumFractionDigits: 2 })
      .replaceAll(",", "");

    // const currency = "LKR"; // or get from req.body if dynamic

    // Final hash
    const hash = md5(
      merchant_id + order_id + amountFormatted + currency + hashedSecret
    )
      .toString()
      .toUpperCase();

    res.json({ hash });
  } catch (err) {
    console.error("Error generating hash:", err);
    res.status(500).json({ message: "Error generating hash" });
  }
});

export default router;
