const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

require('dotenv').config();

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    minlength: [3, "Username is too short"]
  },
  companyName: {
    type: String,
    minlegth: [3, "Company name should be at least 3 characterss long"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, "Invalid email"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password is too short"]
  },
  fullName: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://media.revistagq.com/photos/5ca5ffcfbda594eb7433e978/master/pass/steven_seagal_8758.png"
  },
  description: {
    type: String,
    minlegth: [25, "Description should be at least 25 characters long"]
  },
  isCompany: {
    type: Boolean,
    default: false,
  },
  googleID: {
    type: String,
  }
});

userSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS))
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
