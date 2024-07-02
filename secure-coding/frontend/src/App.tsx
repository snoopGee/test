import { useEffect } from "react";
import "./App.css";
import axios from "./helper/client";
import { publicRoutes } from "./routes/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { UserNavBar } from "./components/UserNavBar";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <UserNavBar />
      <Container>
        <Layout>
          <BrowserRouter>
            <Routes>
              {publicRoutes.map((route, idx) => (
                <Route
                  path={route.path}
                  element={<route.component />}
                  key={idx}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </Layout>
      </Container>
    </div>
  );
}

export default App;
