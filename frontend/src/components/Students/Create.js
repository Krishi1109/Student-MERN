import React, { useReducer, useState } from "react";
import { useFormik } from "formik";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button, Table } from "react-bootstrap";
import { basicSchema } from "../Schemas";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (values, action) => {
    console.log(values);
    console.log("Submitted");

    const response = await fetch("http://localhost:5000/api/user/add", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log("Hello");
      setError(result.message);
    }
    if (response.ok) {
      console.log(result.message);

      setMessage(result.message);
      await new Promise((resolveOuter) => {
        resolveOuter(
          new Promise((resolveInner) => {
            setTimeout(resolveInner, 1000);
          })
        );
      });
      action.resetForm();
      console.log("done");
      navigate("/all");
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        email: "",
        enroll: "",
        age: "",
        dept: "",
        cgpa: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });
  return (
    <div className="container my-5 py-5">
      <h2 className="text-center">Enter Data</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="my-5">
          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik101"
            className="position-relative"
          >
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="First Name"
              isValid={touched.firstname && !errors.firstname}
              isInvalid={touched.firstname && !!errors.firstname}
            />
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.firstname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik102"
            className="position-relative"
          >
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Last Name"
              isValid={touched.lastname && !errors.lastname}
              isInvalid={touched.lastname && !!errors.lastname}
            />

            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="my-5">
          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik101"
            className="position-relative"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="6"
            controlId="validationFormik102"
            className="position-relative"
          >
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control
              type="number"
              name="enroll"
              value={values.enroll}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enrollment Number"
              isValid={touched.enroll && !errors.enroll}
              isInvalid={touched.enroll && !!errors.enroll}
            />

            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.enroll}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="my-5">
          <Form.Group
            as={Col}
            md="4"
            controlId="validationFormik101"
            className="position-relative"
          >
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="age"
              isValid={touched.age && !errors.age}
              isInvalid={touched.age && !!errors.age}
            />
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            controlId="validationFormik101"
            className="position-relative"
          >
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="dept"
              value={values.dept}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Department"
              isValid={touched.dept && !errors.dept}
              isInvalid={touched.dept && !!errors.dept}
            />
            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.dept}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4"
            controlId="validationFormik102"
            className="position-relative"
          >
            <Form.Label>C.G.P.A.</Form.Label>
            <Form.Control
              type="number"
              name="cgpa"
              value={values.cgpa}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="C.G.P.A"
              isValid={touched.cgpa && !errors.cgpa}
              isInvalid={touched.cgpa && !!errors.cgpa}
            />

            <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.cgpa}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button className="dark" variant="secondary" type="submit">
          Submit form
        </Button>
      </Form>
    </div>
  );
};

export default Create;

// const [formData, setFormData] = useState({
//   name: "",
//   email: "",
//   enroll: 0,
//   age: 0,
//   cgpa: 0,
//   dept: "",
// });
// const initialValues = formData;
// const [error, setError] = useState("");
// const [message, setMessage] = useState("");

// const navigate = useNavigate();

// const Formik = useFormik({
//   initialValues: initialValues,
//   onSubmit: (values) => {
//     console.log("Formik");
//     console.log(values);
//   },
// });
// console.log(Formik);

// const submitHandler = async (e) => {
//   e.preventDefault();
//   const addUser = formData;
//   const response = await fetch("http://localhost:5000/api/user/add", {
//     method: "POST",
//     body: JSON.stringify(addUser),
//     headers: {
//       "content-type": "application/json",
//     },
//   });

//   const result = await response.json();

//   if (!response.ok) {
//     console.log("Hello");
//     setError(result.message);
//   }
//   if (response.ok) {
//     console.log(result.message);

//     setMessage(result.message);
//     setFormData({});

//     navigate("/all");
//   }
// };

// {error && <div className="alert alert-danger">{error}</div>}
// {message && <div className="alert alert-success">{message}</div>}

// <form onSubmit={submitHandler} className="m-4 p-4">
// <div className="row">
//   <div className="mb-3 col-4">
//     <Input
//       lableName="Name"
//       type="text"
//       name={"name"}
//       value={formData.name}
//       formData={formData}
//       setFormData={setFormData}
//     />
//   </div>
//   <div className="mb-3 col-4">
//     <Input
//       lableName="Email"
//       type="email"
//       name={"email"}
//       value={formData.email}
//       setFormData={setFormData}
//     />
//   </div>
//   <div className="mb-3 col-4">
//     <Input
//       lableName="Enrollment Number"
//       type="number"
//       name={"enroll"}
//       value={formData.enroll}
//       formData={formData}
//       setFormData={setFormData}
//     />
//   </div>
// </div>
// <div className="row">
//   <div className="mb-3 col-4">
//     <Input
//       lableName="Age"
//       type="age"
//       name={"age"}
//       value={formData.age}
//       setFormData={setFormData}
//     />
//   </div>
//   <div className="mb-3 col-4">
//     <Input
//       lableName="C.G.P.A"
//       type="number"
//       name={"cgpa"}
//       value={formData.cgpa}
//       formData={formData}
//       setFormData={setFormData}
//     />
//   </div>

//   <div className="mb-3 col-4">
//     <Input
//       lableName="Department"
//       type="text"
//       name={"dept"}
//       value={formData.dept}
//       formData={formData}
//       setFormData={setFormData}
//     />
//   </div>
// </div>
// <button type="submit" className="btn btn-primary">
//   Submit
// </button>
// </form>
