const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const getUserPost = async (req, res) => {
  const { id: userId } = req.params;
  const apiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  try {
    const response = await axios.get(apiUrl);
    if (response.status !== StatusCodes.OK) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = response.data;

    return res.status(StatusCodes.OK).json({ posts: data });
  } catch (error) {
    console.error("Fetch error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Facing issue while  fetching json placeholder API" });
  }
};

module.exports = {getUserPost}
