const express = require("express");
const userRouter = require("./routes/user.js");
const urlRouter = require("./routes/url.js");
const URL = require("./model/url.js")
const staticRouter = require("./routes/staticRouter.js")

const cookieParser = require("cookie-parser");


const { connectMongoDb } = require("./connection.js");
const { checkForAuthentication, ristrictTo } = require("./middleware/index");
const path = require("path");
//const { timeStamp } = require("console");

const app = express(); // Define app here

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

connectMongoDb("mongodb://127.0.0.1:27017/piyushgarg-youtube-practice").then(() =>
  console.log("MongoDb Connected...")
);

app.use("/url", ristrictTo(["NORMAL"]), urlRouter); // Now you can use app
app.use("/user", userRouter); // Now you can use app
app.use(checkForAuthentication)



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

