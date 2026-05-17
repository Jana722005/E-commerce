const Razorpay = require("razorpay");

const razorpay = new Razorpay({

  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});


// CREATE PAYMENT ORDER
const createPaymentOrder = async (
  req,
  res
) => {

  try {

    const options = {

      amount:
        Number(req.body.amount) * 100,

      currency: "INR",

      receipt:
        "receipt_" + Date.now(),
    };

    const order =
      await razorpay.orders.create(
        options
      );

    res.status(200).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Payment order creation failed",
    });
  }
};

module.exports = {
  createPaymentOrder,
};