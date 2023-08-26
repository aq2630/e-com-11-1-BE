const multer = require("multer");
const express = require("express");
const path = require("path");

const uploadRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    const customName = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + customName);
  },
});

const upload = multer({ storage: storage });

uploadRouter.post("/", upload.single("image"), async (req, res) => {
  res.status(200).send(req.file);
});

module.exports = uploadRouter;
