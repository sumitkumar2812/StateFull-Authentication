const {getUser} = require("../services/auth");


function ristrictLoggedInUser(req, res, next) {
  const userUid = req.cookies?.uid;

  if(!userUid) return res.redirect("/login");

  const user = getUser(userUid)
  console.log(user)
  if(!user) return res.redirect("/login")

  req.user = user  
  next()

}
module.exports = {
  ristrictLoggedInUser,
};

