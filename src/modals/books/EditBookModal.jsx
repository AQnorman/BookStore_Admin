import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "../../api";

const EditBookModal = ({ show, handleClose, handleEdit, book }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: 0,
    category_id: 0,
    desc: "",
    total_pages: 0,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
      book &&
        setBookData({
          title: book.title || "",
          author: book.author || "",
          price: book.price || 0,
          category_id: book.category.id || 0,
          desc: book.desc || "",
          total_pages: book.total_pages || 0,
        });
      setLoading(false);
    };

    getCategories();
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevBookData) => ({
      ...prevBookData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/books/${book.id}`, bookData);
      console.log(bookData);
      handleEdit(res.data);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={4}
              name="desc"
              value={bookData.desc}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Total Pages</Form.Label>
            <Form.Control
              type="number"
              name="total_pages"
              value={bookData.total_pages}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={bookData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Category</Form.Label>
            {loading ? (
              <div>Loading Categories...</div>
            ) : (
              <Form.Select
                name="category_id"
                value={bookData.category_id}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;
