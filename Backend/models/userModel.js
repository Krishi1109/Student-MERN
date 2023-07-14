const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please Enter First-Name"],
    },
    lastname: {
      type: String,
      required: [true, "Please Enter LastName"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    age: {
      type: Number,
    },
    enroll : {
      type:Number,
      required:[true, "Please Enter Enrollment Number"]
    },
    cgpa:{
      type : Number
    },
    dept :{
      type:String,
      required : [true, "Please Enter Department"]
    }
  },
  { timestamps: true },
  { versionKey: false }
);

// creat Model
const User = mongoose.model("user", userSchema);

module.exports = User;
