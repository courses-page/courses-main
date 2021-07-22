const mongoose = require("mongoose");
const Course = require("../models/Course.model");
const User = require("../models/User.model")
const courseData = require("./courses.json");
const userData = require("./users.json");

require('../db/index');

function loop(x) {
  if (x >= 4) {
    mongoose.connection.close()
          .then(() => console.log('Finish course.seeds.js'))
          .catch(e => console.error(e))
          .finally(() => {
            process.exit(0)
    })
    return;
  } else {
    // hacer cosas
  console.log(`Course and company number ${x+1} created`)
  User.create(userData[x])
  .then((newUser) => {
    companyId = newUser._id
    return Course.create({ ...courseData[x], companyId })
    .then (() => {
      loop(x + 1);
    })
  })
  }
}

mongoose.connection.once('connected', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      console.log('Database cleared');
      loop(0)
    })
    .catch(e => console.error(e))
})