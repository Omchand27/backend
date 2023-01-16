const express = require("express");
const { PostModel } = require("../models/Post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const Q = req.query;
  try {
    const data = await PostModel.find(Q);
    res.send(data)
    console.log("All data is here...")
  } catch (err) {
    res.send(err);
  }
});

postRouter.post("/create", async (req, res) => {
  const post = req.body;
  try {
    const data = new PostModel(post);
    await data.save();
    res.send("Post Created");
    console.log("Post Created");
  } catch (err) {
    res.send(err);
    console.log("You are not Authorised");
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  const data = await PostModel.findOne({ _id: ID });
  const user_Id = req.body.userID;

  try {
    if (user_Id == data.userID) {
      await PostModel.findByIdAndUpdate({ _id: ID }, payload);
      res.send("Post Updated");
      console.log("Post Updated");
    }else{
      res.send(err);
      console.log("You are not Authorised");
    }
  } catch (err) {
    res.send(err);
    console.log("You are not Authorised");
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const data = await PostModel.findOne({ _id: ID });
  const user_Id = req.body.userID;
  try {
    if (user_Id == data.userID) {
      await PostModel.findByIdAndDelete({ _id: ID });
      res.send("Post Deleted");
      console.log("Post Deleted");
    }else{
      res.send("You are not Authorised");
      console.log("You are not Authorised");
    }
  } catch (err) {
    res.send(err,"You are not Authorised");
    console.log("You are not Authorised");
  }
});

module.exports = {
  postRouter,
};
