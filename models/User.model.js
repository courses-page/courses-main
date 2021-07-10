const { Schema, model } = require("mongoose");

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlegth: [3, "Username should be at least 3 chars long"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [emailRegex, "Invalid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlegth: [8, "Password should be at least 8 chars long"]
  },
  fullName: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://www.stevensegallery.com/640/360"
  }
});

const User = model("User", userSchema);

module.exports = User;
