import { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "../../api";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      const res = await axios.get("/api/feedbacks");
      setFeedbacks(res.data);
      console.log(res.data);
    };
    getFeedbacks();
  }, []);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`/api/feedbacks/${feedbackId}`);
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== feedbackId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="my-4">
      <h2>Feedback List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>User ID</th> */}
            <th>Feedback</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.id}>
              {/* <td>{feedback.user.id}</td> */}
              <td>{feedback.feedback}</td>
              <td>{feedback.user.username}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteFeedback(feedback.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Feedbacks;
