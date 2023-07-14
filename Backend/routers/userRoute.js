const express = require("express")
const { newUser, getAllUsers, getSingleuser, deleteUser, updateUser } = require("../controller/userController")
const { authenticate } = require("../Middleware/Authenticate")

const router = new express.Router()

router.route("/add").post(newUser)

router.route("/all").get(getAllUsers)

router.route("/get/:id").get(getSingleuser)

router.route("/delete/:id").delete(authenticate, deleteUser)

router.route("/update/:id").patch(authenticate, updateUser)



module.exports = router