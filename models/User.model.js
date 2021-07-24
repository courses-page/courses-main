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
    minlength: [3, "Company name is too short"]
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
    type: String,
    minlength: [4, "Full name is too short"]
  },
  imageUrl: {
    type: String,
    default: "https://media.revistagq.com/photos/5ca5ffcfbda594eb7433e978/master/pass/steven_seagal_8758.png"
  },
  description: {
    type: String,
    minlength: [25, "Description should be at least 25 characters long"]
  },
  isCompany: {
    type: Boolean,
    default: false,
  },
  googleID: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activationToken: {
    type: String,
    default: () => {
      return Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7)
    }
  }
});

userSchema.virtual("subscriptions", {
  ref: "Subscription",
  localField: "_id",
  foreignField: "userId"
})

userSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "companyId"
})


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
