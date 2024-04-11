const { mongoose } = require("mongoose");

const connectDB = (url) =>
  mongoose
    .connect(url)
    .then(() => console.log(":: DB Connect successfully"))
    .catch((err) => console.log(err));

module.exports = connectDB;
