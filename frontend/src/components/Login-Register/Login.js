import React, { useState } from "react";
import { useFormik } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../Images/form.jpg";
import { facultybasicLoginSchema } from "../Schemas";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (values, action) => {
    try {
      const { data: res } = await axios.post("/api/faculty/login ", values, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (res.success) {
        setError("");
        setMessage(res.message);
        localStorage.setItem("login_token", res.login_token)
        await new Promise((resolveOuter) => {
          resolveOuter(
            new Promise((resolveInner) => { 
              setTimeout(resolveInner, 2000);
            })
          );
        });
        navigate("/me");
        console.log("HEEEEEEEkkiihoouihouih")
        console.log(res);
      }
    } catch (error) {
      console.log("Catch");
      setError(error.response.data.message);
      console.log(error.response);
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: {
        facultyEmail: "",
        password: "",
      },
      validationSchema: facultybasicLoginSchema,
      onSubmit,
    });

  return (
    <div className="container my-5 p-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <Row className="justify-content-lg-center align-items-center p-5 dark-2 text-light border">
        <Col>
          <h2 className="text-center ">Faculty Login Form</h2>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik101"
              className="position-relative my-5"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="facultyEmail"
                value={values.facultyEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                isValid={touched.facultyEmail && !errors.facultyEmail}
                isInvalid={touched.facultyEmail && !!errors.facultyEmail}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.facultyEmail}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik101"
              className="position-relative my-5"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback className="p-0" tooltip>
                Looks good!
              </Form.Control.Feedback>
              <Form.Control.Feedback className="p-0 m-0" type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              className="light text-dark"
              variant="secondary"
              type="submit"
            >
              Submit form
            </Button>
          </Form>
        </Col>
        <Col>
          <img src={img} className="w-100  " alt="" />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
