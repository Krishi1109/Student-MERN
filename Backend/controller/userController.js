const User = require("../models/userModel");

// Add New User
exports.newUser = async (req, res) => {
  try {
    
    const { firstname, lastname, email, age, enroll, cgpa, dept } = req.body;
    const user = new User({ firstname, lastname, email, age, enroll, cgpa, dept });
    const userRegister = await user.save();
    res.status(201).send({
      success: true,
      message: "User Added Successfully",
      result: userRegister,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const getAllUsers = await User.find();
    if (getAllUsers) {
      res.status(200).send({
        success: true,
        message: "All Users",
        result: getAllUsers,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "There is no users in DataBase..!",
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

// Get Perticular user By ID
exports.getSingleuser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      res.status(200).send({
        success: false,
        message: "User does not exists..1",
      });
    }
    res.status(200).send({
      success: true,
      result: user,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

// Delete Particular user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      res.status(200).send({
        success: false,
        message: "User does not exists..1",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "User deleted successfully..1",
      });
    }
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};

// Update Particular use by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!user) {
      res.status(200).send({
        success: false,
        message: "User does not exists..1",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User Updated successfully..1",
      result: user,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
