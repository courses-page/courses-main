const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport")

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
            const newUser = req.body;
            User.create(newUser)
            .then (() => {
                res.redirect("/")
                console.log(`New user created whith username ${newUser.username}`)
            })
            .catch((e) => {
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

module.exports.login = (req, res, next) => {
    console.log("flas:", req.flash())
    res.render("auth/loginUser");
}

module.exports.doLogin = (passport.authenticate('user-local', { failureRedirect: '/auth/loginUser', successRedirect: '/', failureFlash: true }));

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect("/")
}