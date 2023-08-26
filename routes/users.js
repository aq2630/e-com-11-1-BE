const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const isUser = await User.findOne({ userName });

  if (isUser) {
    res.send({ message: "User Already Exist" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userData = { userName, password: hashedPassword };
  const instance = new User(userData);
  const saved = await instance.save();
  res.send({ message: "User Created", user: saved });
});

userRouter.post("/login", async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const isUser = await User.findOne({ userName });

  if (isUser) {
    const match = await bcrypt.compare(password, isUser.password);
    if (match) {
      const token = jwt.sign({ _id: isUser._id }, "12345", {
        expiresIn: "30d",
      });
      res.send({ message: "logged In Successfully", user: isUser, token });
    } else {
      res.send({ message: "Wrong Password" });
    }
  } else {
    res.send({ message: "USer Not Found" });
  }
});

userRouter.get("/all", async (req, res) => {
  const allUsers = await User.find({ userName: { $regex: "Osama" } });

  res.send({ users: allUsers });
});

module.exports = userRouter;
