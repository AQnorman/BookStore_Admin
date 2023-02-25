import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../api";
import { CreateCategoryModal, EditCategoryModal } from "../../modals";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    };

    getCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEditCategoryModal = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  const handleCreateCategory = (category) => {
    setCategories([...categories, category]);
  };

  return (
    <Container className="my-4">
      <h2>Category List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.category}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleShowEditCategoryModal(category)}
                >
                  Edit
                </Button>
                {"  "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={() => setShowCreateModal(true)}>
        Create New Category
      </Button>
      <CreateCategoryModal
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        handleCreate={handleCreateCategory}
      />
      <EditCategoryModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        category={selectedCategory}
      />
    </Container>
  );
};

export default Categories;
