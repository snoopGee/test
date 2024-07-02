import React, { useState, useEffect } from "react";
import axios from "../helper/client";
import { Table } from "react-bootstrap";

type Users = {
  accountId: string;
  username: string;
  balance: Number;
  role: string;
  firstname: string;
  lastname: string;
};

function Admin() {
  const [data, setData] = useState<Users[]>([]);

  const loadData = async () => {
    const result = await axios.post("/api/admin");
    setData(result.data.users);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <br />
      <h2>User Management</h2>
      <br />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "5%", textAlign: "center" }}>#</th>
              <th style={{ width: "15%", textAlign: "center" }}>Accoint ID</th>
              <th style={{ width: "15%", textAlign: "center" }}>Username</th>
              <th style={{ width: "30%", textAlign: "center" }}>Name</th>
              <th style={{ width: "20%", textAlign: "center" }}>Balance</th>
              <th style={{ width: "15%", textAlign: "center" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: Users, idx: number) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{user.accountId}</td>
                <td>{user.username}</td>
                <td>{user.firstname + " " + user.lastname}</td>
                <td>{user.balance.toString()}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Admin;
