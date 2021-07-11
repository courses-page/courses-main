const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");
require('dotenv').config();

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlegth: [3, "Username is too short"]
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
    minlegth: [8, "Password is too short"]
  },
  fullName: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://www.stevensegallery.com/640/360"
  }
});

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
  } else {
    next();
  }
})

userSchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

const User = model("User", userSchema);

module.exports = User;
