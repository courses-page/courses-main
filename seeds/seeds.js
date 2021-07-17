const mongoose = require("mongoose");
const Course = require("../models/Course.model");
const data = require("./courses.json");

require('../db/index');

mongoose.connection.once('connected', () => {

let collectionsList = Object.keys(mongoose.connection.collections)
let promise;

  if(collectionsList.find((collection) => collection === "courses")){
    promise = mongoose.connection.db.dropCollection( "courses");
  } else {
    promise = Promise.resolve()
  }
  promise.then(() => {
        console.log('Database cleared');
  
        return Course.insertMany(data)
      })
      .catch(e => console.error(e))
      .finally(() => {
        mongoose.connection.close()
          .then(() => console.log('Finish course.seeds.js'))
          .catch(e => console.error(e))
          .finally(() => {
            process.exit(0)
          })
    })
})