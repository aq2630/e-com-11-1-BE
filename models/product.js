const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: String,
    price: Number,
    description: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
