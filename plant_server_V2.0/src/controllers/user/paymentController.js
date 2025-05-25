const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
// Generate client secret for stripe payment

const generateClientSecret = async (req, res) => {
  const { price } = req.body;
  console.log(price);
  const amount = parseInt(price * 100);
  if (!price || amount < 1) return;
  const { client_secret } = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: client_secret });
};

module.exports = {
  generateClientSecret,
};
