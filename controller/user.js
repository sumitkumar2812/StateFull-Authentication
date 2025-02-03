const User = require("../model/user")

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" })
    return res.json(user);
}

async function handleUpdateById(req, res) {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.email ||
        !body.gender ||
        !body.jobTitle
     ) {
        return res.status(400).json( {msg: "All fields are require..."})
    }

    const result = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        gender: body.gender,
        jobTitle: body.jobTitle,

    });
    return res.status(201).json({ Msg: "Success", id: result.id })
}

module.exports = { handleGetAllUsers, handleGetUserById, handleUpdateById, handleDeleteUserById, handleCreateNewUser }
