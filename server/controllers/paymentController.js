const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: 4900, // Amount in paise (₹49)
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    const payment = new Payment({
      userId: req.user.id,
      orderId: order.id,
      amount: options.amount
    });
    await payment.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // Create signature hash
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Signature valid
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { paymentId: razorpay_payment_id, signature: razorpay_signature, status: 'completed' }
      );

      await User.findByIdAndUpdate(req.user.id, { plan: 'pro' });

      res.json({ message: "Payment verified effectively", plan: "pro" });
    } else {
      res.status(400).json({ message: "Invalid signature" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
