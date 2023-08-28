const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

router.post("/addtocart", async (req, res) => {
  const { email, foodname, quantity, totalprice, img } = req.body;
  try {
    const result = await Cart.create({
      email,
      foodname,
      quantity,
      totalprice,
      img,
    });

    res.json({ success: "true", result });
  } catch (error) {
    res.send(error);
  }
});

router.post("/fetchcart", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await Cart.find({ email });
    // console.log("result it is :");
    if (!result) {
      res.send("No products found");
    }
    res.json({ success: "true", result });
    // console.log({ success: "true", result });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
