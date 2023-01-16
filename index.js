const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routers/Users.router");
const { postRouter } = require("./routers/Post.router");
const { authRouter } = require("./middlewares/Auth.middleware");
const app = express();

app.use(express.json());
app.use(cors({
    origin:"*"
}))

app.use("/users", userRouter)
app.use(authRouter)
app.use("/posts", postRouter)


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
    console.log(`Server is Running ${process.env.port}`);
  } catch (err) {
    console.log(err);
  }
});
