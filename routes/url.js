const express = require("express");
const {
  handleGenerateNewUrlId, handleGetAnalytics
} = require("../controller/url.js");

const router = express.Router();

router.post("/", handleGenerateNewUrlId);

router.get("/analytics/:shortId",handleGetAnalytics);


module.exports = router;
         