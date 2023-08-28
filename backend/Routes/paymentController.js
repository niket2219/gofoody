const Razorpay = require("razorpay");
var crypto = require("crypto");

module.exports.orders = (req, res) => {
  let instance = new Razorpay({
    key_id: "rzp_test_KuZJa7QKoLO4Xr",
    key_secret: "xrKI86uwvXGTlMP06GwQBeqW",
  });

  var options = {
    amount: req.body.amount * 100, // amount in the smallest currency unit
    currency: "INR",
    // receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return res.send({ code: 500, message: "server error" });
    }
    return res.send({ code: 200, message: "order created", data: order });
    // console.log(order);
  });
};
module.exports.verify = (req, res) => {
  let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
  var expectedSignature = crypto
    .createHmac("sha256", "xrKI86uwvXGTlMP06GwQBeqW")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.razorpay_signature) {
    res.send({ code: 202, message: "payment success" });
  } else {
    res.send({ code: 202, message: "payment failed" });
  }
};
