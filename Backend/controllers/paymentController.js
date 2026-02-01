const Razorpay = require("razorpay");


const razorpay = new Razorpay({
  key_id: process.env.RAZOR_LIVE_KEY,
  key_secret: process.env.RAZOR_LIVE_SECRET
});

const Order = require("../models/Order");
const Product = require("../models/Product");
const crypto = require("crypto");

/**
 * Verify Payment
 * USER API
 */
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();

    // Reduce stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.json({ message: "Payment verified and order confirmed" });
  } catch (error) {
    res.status(500).json({
      message: "Payment verification failed",
      error: error.message
    });
  }
};
