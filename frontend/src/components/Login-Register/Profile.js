import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../Images/profile.jpeg";
import { Row, Button, Col, Badge } from "react-bootstrap";
import  Cookies  from 'universal-cookie'

import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({});
  
  const profileData = async () => {
    try {
      const { data: res } = await axios.get("/api/faculty/me");
      console.log("Hello : ", res);
      if (res.success) {
        setError("");
        setUserData(res.result);
        console.log(res);
      }
    } catch (error) {
      setError(error.response.data.message);
      // window.alert(error.response.data.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    profileData();
  }, [0]);

  return (
    <div className="container my-5 p-5 bg-white">
      <Row className="">
        <Col className="d-flex align-items-center justify-content-center ">
          <img className="" src={ProfileImg} alt="" />
        </Col>
        <Col className="d-flex flex-column align-items-start">
          <h1 className="py-2 ">Information</h1>
          <hr />
          <h5>
            <Badge bg="secondary">Name</Badge> : {userData.name}{" "}
          </h5>
          <h5>
            <Badge bg="secondary">Email</Badge> : {userData.facultyEmail}
          </h5>
          <Row className="py-3">
            <Col>
              <Button href="/add" className="dark mx-3" variant="primary">
                Add students
              </Button>
              <Button href="/all" className="dark mx-3" variant="primary">
                Students List
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
