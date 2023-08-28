const mongoose = require("mongoose");
const mongodb =
  "mongodb+srv://niket2219:Niket250+@cluster0.3hlce2r.mongodb.net/gofoodmern?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo Successfully!");
    const fetched_data = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();

    const fetched_category = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();

    // console.log(fetched_data);
    global.food_data = fetched_data;
    global.food_category = fetched_category;
  } catch (error) {
    // console.log(error);
  }
};
module.exports = connectToMongo;
