const { getUser } = require("../services/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token

  req.user = null;
  console.log(tokenCookie);
  if (!tokenCookie) return next();

  const token = tokenCookie
  const user = getUser(token)

  req.user = user;
  next()
}


function ristrictTo(roles) {    
  return function(req, res, next){
    console.log(req.user);
    if(!req.user) return res.redirect("/login")

    if(!roles.includes(req.user.role)) return res.end("Unauthorized")
    
      
    return next();
  }

}
module.exports = {
  checkForAuthentication,
  ristrictTo
  
};

