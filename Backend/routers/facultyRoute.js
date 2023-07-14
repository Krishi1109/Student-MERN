const express = require("express")
const { newFaculty, facultyLogin, profile, logoutFaculty } = require("../controller/FacultyController")
const { authenticate } = require("../Middleware/Authenticate")

const router = new express.Router()

router.route("/add").post(newFaculty)
router.route("/login").post(facultyLogin)
router.route("/me").get(authenticate , profile)
router.route("/logout").get(authenticate, logoutFaculty)

module.exports = router

// router.route("/test").get((req , res )=>{
//     console.log(req.session.foo , "--------------------------")
//     req.session.foo = 'some text here' // To imitate alter the session 
//     res.send('Hello World!')
// })

// router.route("/testing").get((req , res )=>{
//     console.log(req.session.foo , "--------------------------")
//     res.send('Hello World!')
// })