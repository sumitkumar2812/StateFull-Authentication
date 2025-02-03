const mongoose = require("mongoose");

//schema

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: String,
        require: true,

    },
    visitHistory: [{
        timeStamp: {
            type: Number,
        }
    }]
}, { timestamps: true });
 

//modal

const URL = mongoose.model("url", urlSchema);

module.exports = URL