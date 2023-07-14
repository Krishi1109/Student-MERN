import * as yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
// const emailRules = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


export const basicSchema = yup.object().shape({
  firstname: yup.string().required().min(4).max(25).label("Firstname"),
  lastname: yup.string().required().min(4).max(25),
  email: yup.string().email().required(),
  enroll: yup.number().required(),
  dept: yup.string().required(),
  cgpa: yup.number().required().max(10),
  age: yup.number().positive().integer().required("required"),
  // surname: yup.string().required("required").min(4).max(25),
  // email: yup.string().email("Please Emter valid Email").required("required"),
  // age: yup.number().positive().integer().required("required"),
  // password: yup
  //   .string()
  //   .min(5)
  //   .matches(passwordRules, { message: "Please create stronger password" })
  //   .required("Required"),
});


export const facultybasicSchema = yup.object().shape({
  name: yup.string().required().min(4).max(25).label("Faculty Name"),
  facultyEmail: yup.string().email().required().label("Email"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create stronger password" })
    .required("Required"),
});


export const facultybasicLoginSchema = yup.object().shape({
  facultyEmail: yup.string().email().required().label("Email"),
  password : yup.string().required().label("Password")
});

