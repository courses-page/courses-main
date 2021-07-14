const User = require("../models/User.model");
const mongoose = require("mongoose");
const passport = require("passport");

const flash = require("connect-flash")

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
            if (newUser.companyName) {
                newUser.isCompany = "true";
            }
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
    res.render("auth/loginUser");
}

module.exports.doLogin = function (req, res, next){
    return passport.authenticate('local', { failureRedirect: '/auth/loginUser', successRedirect: '/', failureFlash: true})(req, res, next);
}

module.exports.doLoginGoogle = (req, res, next) => {
    passport.authenticate('google-auth', (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        res.status(400).render('auth/loginUser', { user: req.body, error: validations });
      } else {
        req.login(user, loginErr => {
          if (loginErr) next(loginErr)
          else res.redirect('/')
        })
      }
    })(req, res, next)
  }

module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect("/")
}