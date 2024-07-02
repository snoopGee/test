import React, { useState, useEffect } from "react";
import axios from "../helper/client";
import { Table, Row, Col, Button, Form } from "react-bootstrap";
import Avatar, { genConfig } from "react-nice-avatar";
import moment from "moment";

const config = genConfig({});

export type History = {
  source: String;
  destination: String;
  amount: Number;
  timestamps: Number;
  accountName: String;
};

type Users = {
  username: string;
  balance: Number;
  role: string;
  histories: Array<History>;
  accountId: string;
  firstname: string;
  lastname: string;
};

function EditProfile() {
  const _firstname = localStorage.getItem("firstname") || "";
  const _lastname = localStorage.getItem("lastname") || "";

  const [firstname, setfirstname] = useState(_firstname);
  const [lastname, setlastname] = useState(_lastname);

  const [errorMessage, seterrorMessage] = useState("");

  const onSubmit = async () => {
    if (!firstname || !lastname) {
      seterrorMessage("Please recheck the data");
      return;
    }

    const data = {
      userId: localStorage.getItem("userId"),
      firstname,
      lastname,
    };
    const result = await axios.post("/api/profile/edit", data);

    if (result) {
      localStorage.setItem("firstname", firstname)
      localStorage.setItem("lastname", lastname)
      window.location.href = "/profile";
    }
  };

  const onReset = async () => {
    await setfirstname(_firstname);
    await setlastname(_lastname);
  };

  return (
    <div>
      <br />
      <Row>
        <Col sm={4}>
          <h3>Account Information</h3>
          <br />
          <div style={{ display: "flex", justifyContent: "Left" }}>
            <Avatar style={{ width: "8rem", height: "8rem" }} {...config} />
          </div>
          <br />
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
          <Button variant="warning" onClick={onSubmit}>
            Save
          </Button>{" "}
          <Button variant="warning" onClick={onReset}>
            Reset
          </Button>
          <br />
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Col>
      </Row>
    </div>
  );
}

export default EditProfile;
