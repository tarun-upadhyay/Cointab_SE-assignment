const express = require("express");
const { getUserPost } = require("../Controller/postController");

const router = express.Router();

router.route("/:id").get(getUserPost);
module.exports = router;
