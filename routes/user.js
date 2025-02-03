const express = require("express");

const {handleGetAllUsers} = require("../controller/user")
const {handleGetUserById} =  require("../controller/user")
const {handleUpdateById} = require("../controller/user")
const {handleDeleteUserById} = require("../controller/user")
const {handleCreateNewUser} = require("../controller/user")

const router = express.Router();

router.get("/",handleGetAllUsers);
router.get("/:id",handleGetUserById);
router.patch("/:id",handleUpdateById);
router.delete("/:id",handleDeleteUserById);

router.post("/",handleCreateNewUser)

module.exports = router;
