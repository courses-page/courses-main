const User = require("../models/User.model");
const mongoose = require("mongoose");


module.exports.register = (req, res, next) => {
    res.render("auth/registerUser");
}

module.exports.doRegister = (req, res, next) => {
    const { email } = req.body;

    User.findOne({email: email})
    .then ((user) => {
        if (user) {
            res.render("auth/registerUser", {
                userData: req.body,
                errorMessage: {
                    email: "Email is already in use"
                }
            })
            return
        } 

        if (!user) {
            console.log("REQ BODY: ", req.body)
            User.create(req.body, {runValidators: true})
            .then (() => {
                res.redirect("/")
                //console.log(`New user created whith username ${newUser.username}`)
            })
            .catch((e) => {
                console.log("ENtra erroooooooor")
                if (e instanceof mongoose.Error.ValidationError) {
                    console.log(e.errors)
                  res.render("auth/registerUser", { userData: req.body, errorMessage: e.errors })
                } else {
                  next(e)
                }
            })
        }
    })
    .catch((e) => {
        console.error(e)
    })
}