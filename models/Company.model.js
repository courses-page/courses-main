const { Schema, model } = require("mongoose");

const bcrypt = require("bcrypt");

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
const SALT_ROUNDS = 10;

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const companySchema = new Schema({
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    minlegth: [3, "Company name should be at least 3 chars long"]
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
  description: {
    type: String,
    minlegth: [25, "Description should be at least 25 chars long"]
  },
  imageUrl: {
    type: String,
    default: "https://picsum.photos/640/360"
  }
});

companySchema.pre("save", function(next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, SALT_ROUNDS)
      .then((hash) => {
        this.password = hash;
        next();
      })
  } else {
    next();
  }
})

companySchema.methods.checkPassword = function(passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
}

const Company = model("Company", companySchema);

module.exports = Company;
