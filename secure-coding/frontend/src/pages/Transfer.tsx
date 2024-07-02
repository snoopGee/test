import React, { useState } from "react";
import axios from "../helper/client";
import { Form, Row, Col } from "react-bootstrap";

function Transfer() {
  const [source, setSource] = useState(localStorage.getItem("accountId"));
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState(0);

  const onSubmit = async () => {
    if (amount <= 0 || !source || !destination) return;
    const result = axios.post("/api/transfer", { source, destination, amount });
    console.log(result.data);
  };

  const verifyAmount = async (e: any) => {
    const _amount = parseInt(e.target.value);
    await setAmount(_amount);
  };

  return (
    <div>
      <br />
      <h2>Transfer Function</h2>
      <br />
      <Row>
        <Col sm={4}>
          <Form.Label htmlFor="accountNumber">Account Number</Form.Label>
          <Form.Control
            type="text"
            id="accountNumber"
            aria-describedby="accountNumber"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <Form.Text id="accountNumber" muted>
            Please check the destination account yourself
          </Form.Text>
          <br />
          <br />
          <Form.Label htmlFor="amount">Amount</Form.Label>
          <Form.Control
            type="text"
            aria-describedby="amount"
            value={amount}
            onChange={(e) => verifyAmount(e)}
          />
          <br />
          <input type="submit" value="Submit" onClick={onSubmit} />
        </Col>
      </Row>
    </div>
  );
}

export default Transfer;
