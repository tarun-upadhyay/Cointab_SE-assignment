const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const PostModel = require("../Models/Post.model");
const { Parser } = require("json2csv");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { BadRequestError } = require("../errors");
const getUserPost = async (req, res) => {
  const { id: userId } = req.params;
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  try {
    const response = await axios.get(apiUrl);
    if (response.status !== StatusCodes.OK) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = response.data;
    const checkBulkPost = await PostModel.find({ userId });

    return res
      .status(StatusCodes.OK)
      .json({ posts: data, isAddedDb: checkBulkPost.length > 0 });
  } catch (error) {
    console.error("Fetch error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Facing issue while  fetching json placeholder API" });
  }
};

const addBulkPost = async (req, res) => {
  if (!req.body.data) {
    throw new BadRequestError("This user is already in db");
  }
  const posts = await PostModel.insertMany(req.body.data);
  return res.status(StatusCodes.CREATED).json({ posts });
};

const excelDownload = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const posts = await PostModel.find({ userId });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Posts");

    worksheet.addRow(["User ID", "Post ID", "Title", "Body"]);
    // console.log(posts);

    posts.forEach((post) => {
      //console.log(post);
      worksheet.addRow([post.userId, post.id, post.title, post.body]);
    });

    // Generate Excel file
    const excelFilePath = `posts_${userId}.xlsx`;
    await workbook.xlsx.writeFile(excelFilePath);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${excelFilePath}`
    );

    const fileStream = fs.createReadStream(excelFilePath);
    fileStream.pipe(res);

    fileStream.on("close", () => {
      fs.unlinkSync(excelFilePath);
    });
  } catch (error) {
    console.error("Error downloading Excel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { getUserPost, addBulkPost, excelDownload };
