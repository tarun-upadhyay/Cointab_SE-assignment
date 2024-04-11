const express = require("express");
const { getUserData, updateUser } = require("../Controller/userController");

const router = express.Router();
router.route("/").get(getUserData);
router.route("/update/:id").patch(updateUser);
module.exports = router;
