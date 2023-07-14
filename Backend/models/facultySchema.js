const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    facultyEmail: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
  },
  { timestamps: true },
  { versionKey: false }
);

facultySchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
});

facultySchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (err) {
    console.log(err);
  }
};

// create Model
const Faculty = mongoose.model("faculty", facultySchema);

module.exports = Faculty;
