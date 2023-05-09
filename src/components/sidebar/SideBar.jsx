import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Nav,
  Navbar,
  Offcanvas,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineLeft } from "react-icons/ai";
import { Login } from "../../modals";
import { getCookie } from "../../utils/getCookie";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLoginShow = () => setLoginShow(true);
  const handleLoginClose = () => setLoginShow(false);

  const handleLogout = () => {
    document.cookie =
      "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <>
      <Navbar
        className="shadow-sm"
        variant="dark"
        expand={false}
        style={{ backgroundColor: "#3d0066" }}
      >
        <Container>
          <Navbar.Toggle onClick={handleShow}>
            <HiOutlineMenu size={25} color="white" />
          </Navbar.Toggle>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="navbar-title">Bookstore Admin Panel</div>
          </Navbar.Brand>

          {getCookie("loggedIn") ? (
            <Button variant="warning" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="warning" onClick={handleLoginShow}>
              Login
            </Button>
          )}

          <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Menu
              </Offcanvas.Title>
              <Button variant="link" onClick={handleClose}>
                <AiOutlineLeft size={25} color="white" />
              </Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/" onClick={handleClose}>
                  Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/users" onClick={handleClose}>
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/books" onClick={handleClose}>
                  Books
                </Nav.Link>
                <Nav.Link as={Link} to="/categories" onClick={handleClose}>
                  Categories
                </Nav.Link>
                <Nav.Link as={Link} to="/feedbacks" onClick={handleClose}>
                  Feedbacks
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      <Login show={loginShow} handleClose={handleLoginClose} />
    </>
  );
};

export default SideBar;
