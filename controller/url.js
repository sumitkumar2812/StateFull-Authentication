const URL = require("../model/url");
const shortid = require("shortid");


async function handleGenerateNewUrlId(req, res) {
    const body = req.body;

    if(!body.url) return res.status(400).json({error: "url is required."})

    const ShortId =  shortid();
    
    await URL.create({
        shortId: ShortId,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.render("home", {
        id: ShortId
    })
    //return res.json({id: ShortId})
}

async function handleGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {handleGenerateNewUrlId, handleGetAnalytics};

