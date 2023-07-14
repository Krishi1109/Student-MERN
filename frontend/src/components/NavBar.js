import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const { data: res } = await axios.get("/api/faculty/logout");
      if (res.success) {
        localStorage.clear();
        navigate("/login");
      } else {
        navigate("/login");
      }
      console.log(res);
    } catch (error) {
      alert("Already Logged Out");
      console.log(error);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="dark"
    >
      <Container>
        <Link className="navbar-brand" to="/">
          MERN-STACk
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link active" to="/add">
              Create Post
            </Link>
            <Link className="nav-link active" to="/all">
              All Post
            </Link>
          </Nav>
          <Nav>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/me">Profile</Nav.Link>
            <Nav.Link onClickCapture={logout}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
