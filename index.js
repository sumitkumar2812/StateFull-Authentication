const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/user.js");
const urlRouter = require("./routes/url.js");
const URL = require("./model/url.js")
const staticRouter = require("./routes/staticRouter.js")

const { connectMongoDb } = require("./connection.js");
const { logReqRes } = require("./middleware/index");
const path = require("path");
//const { timeStamp } = require("console");

const app = express(); // Define app here

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectMongoDb("mongodb://127.0.0.1:27017/urlDatabase").then(() =>
  console.log("MongoDb Connected...")
);

app.use(logReqRes("logupdate.txt"));

app.use("/api/user", userRouter); // Now you can use app

app.use("/url", urlRouter); // Now you can use app

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate({
    shortId
  }, { $push: { visitHistory: { timeStamp: Date.now() } } })

  return res.redirect(result.redirectURL);

});


app.use("/", staticRouter);



app.listen(PORT, () =>
  console.log(`Server Start on Port Number ${PORT} congratulation...`)
);

