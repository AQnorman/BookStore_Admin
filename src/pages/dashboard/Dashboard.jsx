import { Card, Row, Col, Container } from "react-bootstrap";
import { FaBook, FaThList, FaComments, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cardStyles = {
    cursor: "pointer",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
  };

  const iconStyles = {
    fontSize: "50px",
    color: "#007bff",
    marginLeft: "auto",
  };

  const titleStyles = {
    fontSize: "2rem",
    fontWeight: "normal",
    marginBottom: "0",
  };

  const descriptionStyles = {
    fontSize: "0.9rem",
    color: "#6c757d",
    marginTop: "5px",
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <Card
            style={cardStyles}
            onClick={() => {
              navigate("/users");
            }}
          >
            <div>
              <h1 style={titleStyles}>Users</h1>
              <div style={descriptionStyles}>Manage your users here</div>
            </div>
            <FaUser style={iconStyles} />
          </Card>
        </Col>
        <Col>
          <Card
            style={cardStyles}
            onClick={() => {
              navigate("/books");
            }}
          >
            <div>
              <h1 style={titleStyles}>Books</h1>
              <div style={descriptionStyles}>Manage your books here</div>
            </div>
            <FaBook style={{ ...iconStyles, color: "#8248a8" }} />
          </Card>
        </Col>
        <Col>
          <Card
            style={cardStyles}
            onClick={() => {
              navigate("/categories");
            }}
          >
            <div>
              <h1 style={titleStyles}>Categories</h1>
              <div style={descriptionStyles}>Manage your categories here</div>
            </div>
            <FaThList style={{ ...iconStyles, color: "#28a745" }} />
          </Card>
        </Col>
        <Col>
          <Card
            style={cardStyles}
            onClick={() => {
              navigate("/feedbacks");
            }}
          >
            <div>
              <h1 style={titleStyles}>Feedbacks</h1>
              <div style={descriptionStyles}>Manage feedbacks here</div>
            </div>
            <FaComments style={{ ...iconStyles, color: "#dc3545" }} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
