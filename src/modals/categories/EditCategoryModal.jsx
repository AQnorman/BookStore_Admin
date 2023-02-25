import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../api";

const EditCategoryModal = ({ show, handleClose, category, handleEdit }) => {
  const [updatedCategory, setUpdatedCategory] = useState(category?.category);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/categories/${category.id}`, {
        category: updatedCategory,
      });
      handleEdit(res.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={updatedCategory}
              onChange={(e) => setUpdatedCategory(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;
