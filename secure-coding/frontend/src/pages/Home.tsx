import React, { useState } from "react";
import axios from "../helper/client";
import { Form, Button } from "react-bootstrap";

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async () => {
    if (!username || !password) return;

    const reqBody = {
      username,
      password,
    };

    const result = await axios.post("/api/auth", reqBody);

    if (!result) return;

    const { user, token } = result.data;
    localStorage.setItem("userId", user._id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("firstname", user.firstname);
    localStorage.setItem("lastname", user.lastname);
    localStorage.setItem("role", user.role);
    localStorage.setItem("accountId", user.accountId);
    localStorage.setItem("token", token);

    window.location.href = `/profile`;
  };

  return (
    <div>
      <Form style={{ width: "350px", paddingTop: "50px" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your username with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="warning" onClick={onSubmit}>
          Sign In
        </Button>
        <br />
        <br />
        <Form.Text className="text-muted">
            Haven't got an account, <a href="/register">sign up</a> here
          </Form.Text>
      </Form>
    </div>
  );
}

export default Home;
