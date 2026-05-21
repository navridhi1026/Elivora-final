const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order.model");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// CREATE ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay create order error:", error);
    res.status(500).json({ message: "Failed to create payment order" });
  }
});

// VERIFY PAYMENT
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    const newOrder = new Order({
      ...orderData,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: "paid",
      status: "processing",
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Razorpay verify error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

module.exports = router;