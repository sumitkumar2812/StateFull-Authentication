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

    }],
    createdBy:{type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    } 
}, { timestamps: true });


//modal

const URL = mongoose.model("url", urlSchema);

module.exports = URL