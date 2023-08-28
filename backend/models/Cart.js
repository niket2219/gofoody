const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  foodname: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalprice: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("cart", CartSchema);
