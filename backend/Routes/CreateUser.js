const express = require("express");

const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "ffbfbh766243ryjhweiudqeyrhbfewyiyyu3rg3rgw";

router.post("/createuser", async (req, res) => {
  const { name, email, password, location } = req.body;
  try {
    const secpassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: secpassword,
      location,
    });

    res.json({ success: "true" });
  } catch (error) {
    // console.log(error);
  }
});

router.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userdata = await User.findOne({
      email,
    });

    if (!userdata) {
      res.send({ login: false });
    } else {
      const matchpass = await bcrypt.compare(password, userdata.password);

      if (!matchpass) {
        res.json({ login: false });
      } else {
        const data = {
          user: {
            id: userdata._id,
          },
        };

        const authToken = jwt.sign(data, key, {
          // expiresIn: 10,
        });
        // res.cookie("jwt", authToken);

        res.json({
          login: true,
          userdata,
          authToken: authToken,
        });
      }
    }
  } catch (error) {
    // console.log(error);
  }
});

module.exports = router;
