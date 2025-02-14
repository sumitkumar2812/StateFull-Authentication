const jwt = require("jsonwebtoken")
const secret = "sumit@281220"

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email:user.email,
        role:user.role,
    },secret) 
}

function getUser(token) {
    if (!token) return null;
    
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return null; // Return null if token is invalid or expired
    }
}

module.exports = { setUser, getUser }