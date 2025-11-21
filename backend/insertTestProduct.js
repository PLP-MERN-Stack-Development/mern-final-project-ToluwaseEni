const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");

    const test = await Product.create({
      name: "Test Product",
      description: "This is to generate the database in Atlas.",
      price: 1000,
      category: "Test",
      image: "uploads/products/test.jpg",
      designer: "67a1234567890abc12345678", // fake ID
    });

    console.log("Inserted:", test);
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
