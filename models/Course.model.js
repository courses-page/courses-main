const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const courseSchema = new Schema({
  title: {
    type: String,
    minlength: [3, "Username is too short"],
    required: [true, "Course title is required"]
  },
  subject: {
    type: String,
    enum: ['Languages', 'Natural Sciences', 'Computer Science', 'Mathematics', 'Business', 'Law', 'Arts'],
    required: [true, "Subject is required"]
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: {
    type: String,
    enum: ['10h', '30h', '50h', '100h', '200h', '500h', '1000h'],
    required: [true, "Course duration is required"],
  },
  difficulty: {
    type: String,
    enum: ['Basic', 'Intermediate', 'Advanced'],
    required: [true, "Course duration is required"]
  },
  description: {
    type: String,
    minlength: [40, "Course description is too short"],
    required: [true, "Course duration is required"]
  },
  address: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "https://media.revistagq.com/photos/5ca5ffcfbda594eb7433e978/master/pass/steven_seagal_8758.png"
  }
});

const Course = model("Course", courseSchema);

module.exports = Course;
