const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const cors = require("cors");
const uploadRouter = require("./routes/upload");

require("dotenv").config();

const app = express();

app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.mongURI).then(() => console.log("Connected!"));

app.use(express.json());

const PORT = 8000;

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/upload", uploadRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
