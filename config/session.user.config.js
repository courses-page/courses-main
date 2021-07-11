const session = require("express-session");
const MongoStore = require("connect-mongo");

module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "change me",
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: "lax",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/courses-main"
      })
    })
  )
}
