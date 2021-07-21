const mongoose = require("mongoose");
const { Schema, model } = mongoose;
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const subscriptionSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    }
},
{
    toJSON: {
    virtuals:true
  },toObject: {
    virtuals:true
  }}
  );

const subscription = model("Subscription", subscriptionSchema);

module.exports = subscription;
