import React, { useState, useEffect } from "react";
import axios from "../helper/client";
import { Table, Row, Col } from "react-bootstrap";
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

function Profile() {
  
  const [data, setData] = useState<Users>({
    username: "",
    balance: 0,
    role: "",
    histories: [],
    accountId: "",
    firstname: "",
    lastname: "",
  });

  const loadData = async () => {
    const result = await axios.post("/api/user", {
      username: localStorage.getItem("username"),
    });
    setData(result.data.user);
  };

  useEffect(() => {
    loadData();
  }, []);

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
          <table>
            <tr>
              <td style={{ width: "150px" }}>
                <b>Account ID</b>
              </td>
              <td>: {data.accountId}</td>
            </tr>
            <tr>
              <td>
                <b>Username</b>
              </td>
              <td>: {data.username}</td>
            </tr>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>: {data.firstname + " " + data.lastname}</td>
            </tr>
            <tr>
              <td>
                <b>Balance</b>
              </td>
              <td>: {data.balance.toFixed(2).toLocaleString()}</td>
            </tr>
            <tr>
              <td>
                <b>Role</b>
              </td>
              <td>: {data.role}</td>
            </tr>
          </table>
        </Col>
        <Col sm={8}>
          <h3>Transaction History</h3>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th style={{ width: "5%", textAlign: "center" }}>#</th>
                <th style={{ width: "25%", textAlign: "center" }}>Date</th>
                <th style={{ width: "20%", textAlign: "center" }}>
                  Account Number
                </th>
                <th style={{ width: "30%", textAlign: "center" }}>
                  Account Name
                </th>
                <th style={{ width: "15%", textAlign: "center" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.histories.map((history: History, idx: number) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>
                    {moment(parseInt(history.timestamps.toString())).format("DD/mm/yyyy hh:MM:ss")}
                  </td>
                  <td>{history.destination}</td>
                  <td>{history.accountName}</td>
                  <td style={{ textAlign: "right", paddingRight: "10px" }}>
                    {history.amount.toFixed(2).toString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
