import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiCodesandbox } from "react-icons/si";
import { Link } from "react-router-dom";

export const UserNavBar = () => {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/index";
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#" style={{ color: "#F0B90B" }}>
          <b>Secure Coding</b>
        </Navbar.Brand>
        {localStorage.getItem("username") ? (
          <Nav className="me-auto">
            <Nav.Link href="/profile">Home</Nav.Link>
            <Nav.Link href="/transfer">Transfer</Nav.Link>
            {localStorage.getItem("role") == "admin" ? (
              <Nav.Link href="/admin">Admin</Nav.Link>
            ) : (
              <></>
            )}
          </Nav>
        ) : (
          <></>
        )}

        <Nav>
          <Nav.Link href="/profile/edit">
            {localStorage.getItem("username")}
          </Nav.Link>
          <Nav.Link onClick={Logout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
