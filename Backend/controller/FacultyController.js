const Faculty = require("../models/facultySchema");
const bcrypt = require("bcrypt");
const Cookies = require("cookies");
const session = require("express-session");

exports.newFaculty = async (req, res, next) => {
  try {
    const { name, facultyEmail, password } = req.body;

    const FacultyExist = await Faculty.findOne({ facultyEmail });
    if (FacultyExist) {
      return res.status(409).send({
        status: false,
        message: "Faculty with givein email is already exist!",
      });
    }
    const faculty = new Faculty({ name, facultyEmail, password });
    const facultyRegister = await faculty.save();
    return res.status(201).send({
      success: true,
      message: "Faculty registered successfully",
      result: {
        id: facultyRegister._id,
        name: facultyRegister.name,
        facultyEmail: facultyRegister.facultyEmail,
        password: facultyRegister.password,
      },
    });
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
};

exports.facultyLogin = async (req, res) => {
  try {
    
    const token = req.cookies.login_token;
    if (token) {
      return res
        .status(422)
        .send({ status: false, message: "You Are Already Loggedin" });
    } else {
      const { facultyEmail, password } = req.body;
      const faculty = await Faculty.findOne({
        facultyEmail,
      });
      if (!faculty) {
        return res
          .status(401)
          .send({ status: false, message: "Invalid Email or Password" });
      }
      const isPasswordValid = await bcrypt.compare(password, faculty.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ status: false, message: "Invalid Credentials" });
      }
      let token = await faculty.generateAuthToken();
      res.cookie("login_token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      console.log("IFfff")
      if (req.session.page_views) {
        req.session.page_views++;
        console.log("IFfff")
        // return res.send("You visited this page " + req.session.page_views + " times");
      } else {
        req.session.page_views = 1;
        console.log("Elseeee")
        // return res.send("Welcome to this page for the first time!");
      }

      return res.status(200).send({
        success: true,
        message: "Logged in Successfully..!",
        login_token : token,
        result: {
          id: faculty._id,
          facultyEmail: faculty.email,
          password: faculty.password,
        },
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
};

exports.profile = async (req, res) => {
  console.log(req.rootUser);
  return res.send({
    success: true,
    result: req.rootUser,
  });
};

exports.logoutFaculty = async (req, res) => {
  const logOut = res.clearCookie("login_token");
  console.log(logOut);

  return res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
