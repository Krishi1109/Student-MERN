const Faculty = require("../models/facultySchema");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

// "tokens.token": token}
exports.authenticate = async (req, res, next) => {
  // const FacultyExist = await Faculty.findOne({facultyEmail : "test@gmail.com"});
  // console.log(FacultyExist)
  try {
    const token = req.cookies.login_token;
    console.log("TOKENNNN : " , token)
    const verifyToken = jwt.verify(token, process.env.SECRET);
    console.log("verifyToken" ,verifyToken)
    const rootUser = await Faculty.findOne({ _id:verifyToken._id , });

    if (!rootUser) {
      console.log("Hello0ssss")
      return res.status(401).send({
        success: false,
        message: "Invalid User",
      });
    }

    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;

    next();
  } catch (err) {
    return res.status(401).send({
      success: false,
      login : false,
      message: "Unauthorized : No token provided...",
    });
  }
};
