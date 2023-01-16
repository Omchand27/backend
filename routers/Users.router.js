const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/Users.model");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const data = await UserModel.find({ email });
  const token = jwt.sign({ userID: data[0]._id }, process.env.secret_key);
  bcrypt.compare(pass, data[0].pass, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send({ msg: "Login Successful", token });
      console.log("Login Successful");
    }
  });
  try {
  } catch (err) {
    res.send(err);
    console.log("Something Went Wrong");
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, pass } = req.body;
  try {
    bcrypt.hash(pass, 7, async (err, secure_pass) => {
      if (err) {
        console.log(err);
        res.send("Something Went Wrong");
      } else {
        const user = new UserModel({ name, email, gender, pass: secure_pass });
        await user.save();
        res.send("Register Successful");
        console.log("Register Successful");
      }
    });
  } catch (err) {
    res.send(err);
    console.log("Something Went Wrong");
  }
});

module.exports = {
  userRouter,
};
