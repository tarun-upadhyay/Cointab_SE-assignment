const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, required: [true, "Please provide id"] },
    name: { type: String, required: [true, "Pleae provide name"] },
    username: { type: String, required: [true, "Pleae provide username"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Pleae provide email"],
    },
    alreadyPresent: Boolean,
    address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,
      geo: {
        lat: String,
        lng: String,
      },
    },
    phone: String,
    website: String,
    company: {
      name: String,
      catchPhrase: String,
      bs: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
