const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const connectDb = require("./db");
const cors = require("cors");
const paymentController = require("./Routes/paymentController");

connectDb();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayFood"));
app.use("/api", require("./Routes/Cart"));

app.post("/orders", paymentController.orders);
app.post("/verify", paymentController.verify);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
