import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "../Schemas";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button, Table } from "react-bootstrap";
const Update = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState(0);
  // const [enroll, setEnroll] = useState(0);
  // const [cgpa, setCgpa] = useState(0);
  // const [dept, setDept] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   enroll: "",
  //   age: "",
  //   dept: "",
  //   cgpa: "",
  // });
  const onSubmit = async (values, action) => {
    // e.preventDefault();
    console.log(values);
    const updatedUser = values;

    const response = await fetch(
      `/api/user/update/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.log("Hello");
      setError(result.message);
    }
    if (response.ok) {
      console.log(result.message);

      setMessage(result.message);
      setError("");
      // setName("");
      // setEmail("");
      // setAge(0);

      navigate("/all");
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      enroll: "",
      age: "",
      dept: "",
      cgpa: "",
    },
    // handleChange: setValues,

    validationSchema: basicSchema,
    onSubmit,
  });

  // console.log(values);

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/api/user/get/${id}`);

    const result = await response.json();

    if (!response.ok) {
      console.log("Hello");
      setError(result.message);
    }
    if (response.ok) {
      setValues(result.result);
    }
  };
  console.log(values);

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-5 py-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <h2 className="text-center">Edit Data</h2>

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
              onChange={(e) => setFieldValue("firstname", e.target.value)}
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
              onChange={(e) => setFieldValue("lastname", e.target.value)}
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
              onChange={(e) => setFieldValue("email", e.target.value)}
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
              onChange={(e) => setFieldValue("enroll", e.target.value)}
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
              onChange={(e) => setFieldValue("email", e.target.value)}
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

        <Button className="button" variant="secondary" type="submit">
          Submit form
        </Button>
      </Form>
  
    </div>
  );
};

export default Update;
