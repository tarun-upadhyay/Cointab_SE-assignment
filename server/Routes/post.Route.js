const express = require("express");
const {
  getUserPost,
  addBulkPost,
  excelDownload,
} = require("../Controller/postController");

const router = express.Router();

router.route("/").post(addBulkPost);
router.route("/excelDownload/:id").get(excelDownload);
router.route("/:id").get(getUserPost);
module.exports = router;
