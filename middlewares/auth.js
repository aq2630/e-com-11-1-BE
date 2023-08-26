const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  const headers = req.headers;
  let token;

  if (headers.authorization && headers.authorization.startsWith("Bearer")) {
    try {
      token = headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "12345");
      const isUser = await User.findOne({ _id: decoded._id });
      next();
    } catch (error) {
      res.status(401).send({ message: "Not Authorized", error: error.message });
    }
  } else {
    res.send({ message: "No Token", headers });
  }
};

module.exports = protect;
