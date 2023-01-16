const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRouter = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, process.env.secret_Key);
    if (decoded) {
      const userID = decoded.userID;
      req.body.userID = userID;
      next();
    } else {
      res.send("Please Login First");
      console.log("Please Login First");
    }
  } else {
    res.send("Please Login First");
    console.log("Please Login First");
  }
};

module.exports = {
  authRouter,
};
