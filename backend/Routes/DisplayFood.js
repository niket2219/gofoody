const express = require("express");

const router = express.Router();

router.get("/fetchfood", async (req, res) => {
  // console.log(global.food_data);
  res.send([global.food_data, global.food_category]);
});

module.exports = router;
