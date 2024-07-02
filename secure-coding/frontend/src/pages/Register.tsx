import React, { useState, useEffect } from "react";
import axios from "../helper/client";
import { Form, Row, Col, Button } from "react-bootstrap";

function Register() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [errorMessage, seterrorMessage] = useState("");

  const onSubmit = async () => {
    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !confirmpassword
    ) {
      seterrorMessage("Please recheck the registration form");
      return;
    }

    const data = {
      firstname,
      lastname,
      username,
      email,
      password,
    };
    const result = await axios.post("/api/register", data);

    if (result) {
      window.location.href = "/index";
    }
  };

  useEffect(() => {
    if (password != confirmpassword) {
      seterrorMessage("Confirm password miss match");
    } else {
      seterrorMessage("");
    }
  }, [password, confirmpassword]);

  return (
    <div>
      <br />
      <h2>Regitration Form</h2>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label htmlFor="firstname">FirstName</Form.Label>
          <Form.Control
            type="text"
            id="firstname"
            aria-describedby="firstname"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="lastname">Lastname</Form.Label>
          <Form.Control
            type="text"
            id="lastname"
            aria-describedby="lastname"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            aria-describedby="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            aria-describedby="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            aria-describedby="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          <Form.Label htmlFor="confirmpassword">Confirm Password</Form.Label>
          <Form.Control
            type="text"
            id="confirmpassword"
            aria-describedby="confirmpassword"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />
          <br />
          <Button variant="warning" onClick={onSubmit}>
            Sign In
          </Button>
          <br />
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
