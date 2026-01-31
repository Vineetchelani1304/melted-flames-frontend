const razorpay = new Razorpay({
  key_id: process.env.RAZOR_LIVE_KEY,
  key_secret: process.env.RAZOR_LIVE_SECRET
});

// Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' });
    }
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    };
    console.log("Creating Razorpay order with options:", options);
    const order = await razorpay.orders.create(options);
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Razorpay error', error: error.message });
  }
};