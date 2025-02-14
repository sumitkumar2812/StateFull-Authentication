const express = require("express");
const URL = require("../model/url")
const router = express.Router();
const {ristrictTo} = require("../middleware/index")



router.get("/admin/urls",ristrictTo(["ADMIN"]), async (req, res) =>{
  const allUrls = await URL.find({})
  return res.render("home",{
    urls: allUrls
  })
});



router.get("/", ristrictTo(["NORMAL"]), async (req, res) =>{
  const allUrls = await URL.find({createdBy: req.user._id})
  return res.render("home",{
    urls: allUrls
  })
});




router.get("/signup",(req, res)=>{
  return res.render("signup")
})

router.get("/login",(req, res)=>{
  return res.render("login")
})

module.exports = router;