const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require("mongoose");

const User = require("../models/User.model");

passport.serializeUser((user, next) => {
  next(null, user.id);
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then((user => next(null, user)))
    .catch(next);
})

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, next) => {
  console.log(password, email)
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        next(null, false, { message: "Email or password are incorrect" })
      } else {
        return user.checkPassword(password)
          .then((match) => {
            if (match) {
              if(user.active){
                next(null, user)
              }else{
                next(null, false, {message: "Check your email, you have to activate your account!"})
              }
            } else {
              next(null, false, { message: "Email or password are incorrect" })
            }
          })
      }
    })
    .catch(next)
}))


passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.G_CLIENT_ID,
  clientSecret: process.env.G_CLIENT_SECRET,
  callbackURL: process.env.G_REDIRECT_URI,
}, (_, __, profile, next) => {
  const googleID = profile.id
  const email = profile.emails[0] ? profile.emails[0].value : undefined;

  if (googleID && email) {
    User.findOne({ $or: [
      { email: email },
      { googleID: googleID }
    ]})
    .then((user) => {
      console.log("USER: ", user)
      if (!user) {
        let newUserInstance = new User({
          email,
          password: Math.random().toString(36).slice(-8),
          googleID: googleID,
          active: true
        })

        return newUserInstance.save()
          .then(newUser => next(null, newUser))
      } else {
        next(null, user)
      }
    })
    .catch(next)
  } else {
    next(null, null, { error: 'Error connecting with Google OAuth' })
  }
}))