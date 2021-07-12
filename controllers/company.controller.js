const Company = require("../models/Company.model");
const mongoose = require("mongoose");
const passport = require("passport")

module.exports.register = (req, res, next) => {
    res.render("auth/registerCompany");
}

module.exports.doRegister = (req, res, next) => {
    const { email } = req.body;

    Company.findOne({email: email})
    .then ((user) => {
        if (user) {
            res.render("auth/registerCompany", {
                userData: req.body,
                errorMessage: {
                    email: "Email is already in use"
                }
            })
            return
        } 

        if (!user) {
            const newUser = req.body;
            Company.create(newUser)
            .then (() => {
                res.redirect("/")
                console.log(`New user created whith username ${newUser.companyName}`)
            })
            .catch((e) => {
                if (e instanceof mongoose.Error.ValidationError) {
                    console.log(e.errors)
                  res.render("auth/registerCompany", { userData: req.body, errorMessage: e.errors })
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
    res.render("auth/loginCompany");
}

module.exports.doLogin = (passport.authenticate('company-local', { failureRedirect: '/auth/loginCompany', successRedirect: '/', failureFlash: true }));
