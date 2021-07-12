const companyPassport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Company = require("../models/Company.model");

companyPassport.serializeUser((user, next) => {
    next(null, user.id);
  })
  
companyPassport.deserializeUser((id, next) => {
Company.findById(id)
    .then((user => next(null, user)))
    // .catch(e => next(e))
    .catch(next);
})

companyPassport.use('company-local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, next) => {
    Company.findOne({ email: email })
      .then((user) => {
        if (!user) {
          next(null, false, { error: "Email or password are incorrect" })
        } else {
          return user.checkPassword(password)
            .then((match) => {
              if (match) {
                next(null, user)
              } else {
                next(null, false, { error: "Email or password are incorrect" })
              }
            })
        }
      })
      .catch(next)
  }))