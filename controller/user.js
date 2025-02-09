const { v4: uuidv4 } = require('uuid');
const {setUser, } = require("../services/auth")

const User = require("../model/user")

async function handleUserSignup(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name, email, password,
    });
    return res.redirect("/")

}

async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password})

    if (!user) return res.render("login",{
        error : "email or password wrong"
    })
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId)
    return res.redirect("/")

}

module.exports = { handleUserSignup, handleUserLogin }
