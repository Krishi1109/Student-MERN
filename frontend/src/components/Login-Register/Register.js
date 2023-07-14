import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import img from "../../Images/form.jpg";
import { facultybasicSchema } from "../Schemas";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (values, action) => {
    console.log("Hello");
    try {
      const url = "/api/faculty/add";
      const { data: res } = await axios.post("/api/faculty/add ", values, {
        headers: {
          "Content-Type": "application/json"
        },
      });
      // const res = await axios.post(url, values);

      console.log(res);
      if (res.success) {
        console.log("HEEEELLLLOOOOOOO")
        setError("");
        alert(res.message)
        // setMessage(res.message);
        // await new Promise((resolveOuter) => {
        //   resolveOuter(
        //     new Promise((resolveInner) => {
        //       setTimeout(resolveInner, 2000);
        //     })
        //   );
        // });
        navigate("/login");
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
        name: "",
        facultyEmail: "",
        password: "",
      },
      validationSchema: facultybasicSchema,
      onSubmit,
    });
  console.log(values);
  return (
    <div className="container my-5 p-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <Row className="justify-content-lg-center align-items-center p-5 dark text-light border">
        <Col>
          <h2 className="text-center ">Faculty Registration Form</h2>
          <Form noValidate onSubmit={handleSubmit}>
            {/* <Row className="my-5"> */}
            <Form.Group
              as={Col}
              md="8"
              controlId="validationFormik101"
              className="position-relative my-5"
            >
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Faculty Name"
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && !!errors.name}
              />
              <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

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

// import axios from "axios";

// const Register = () => {
//   const [userEmail, setUserEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log("Hello");
//       await axios.post("http://localhost:5000/api/user/register", {
//         userEmail,
//         password,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="p-5 m-5">
//       <h1>Register</h1>
//       <form action="POST">
//         <label htmlFor="">Email : </label>
//         <input
//           type="email"
//           onChange={(e) => {
//             setUserEmail(e.target.value);
//           }}
//           placeholder="Please Enter your Email"
//         />
//         <label htmlFor="">Password : </label>
//         <input
//           type="password"
//           onChange={(e) => {
//             setPassword(e.target.value);
//           }}
//           placeholder="Please Enter your Password"
//         />
//         <button type="submit" onClick={submit}>
//           Submit
//         </button>
//       </form>

//       <br />
//       <p>OR</p>

//       <br />
//       <Link to="/login">Login</Link>
//     </div>
//   );
// };

export default Register;
