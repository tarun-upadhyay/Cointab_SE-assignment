const axios = require("axios");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../Models/User.model");
const {
  BadRequestError,
  UnauthenticatedError,
  CustomAPIError,
  NotFoundError,
} = require("../errors");
const getUserData = async (req, res) => {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await axios.get(apiUrl);
    if (response.status !== StatusCodes.OK) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let data = response.data;

    const dbData = await UserModel.find({});

    const updatedJsonApi = data.map((user) => {
      const match = dbData.find(
        (dbUser) => dbUser.id === user.id && dbUser.email === user.email
      );
      if (match) {
        return { ...user, alreadyPresent: true };
      } else {
        return { ...user, alreadyPresent: false };
      }
    });
    console.log(updatedJsonApi);

    return res.status(StatusCodes.OK).json({ user: updatedJsonApi });
  } catch (error) {
    console.error("Fetch error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Facing issue while  fetching json placeholder API" });
  }
};
const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const apiUrl = `https://jsonplaceholder.typicode.com/users?id=${userId}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status !== StatusCodes.OK) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = response.data;
    let { email, id } = data[0];
    data[0].alreadyPresent = true;
    const dbData = await UserModel.findOne({ email, id });
    console.log(dbData);
    if (dbData) throw new BadRequestError("This user is already in db");

    const storeData = await UserModel.create(data[0]);
    console.log(storeData);
    return res.status(StatusCodes.OK).json({ user: data });
  } catch (error) {
    console.error("Fetch error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Facing issue while  fetching json placeholder API" });
  }
 
};

module.exports = { getUserData, updateUser };
