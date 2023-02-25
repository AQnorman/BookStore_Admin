import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../api";
import { CreateBookModal, EditBookModal } from "../../modals";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleCreateModalOpen = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  useEffect(() => {
    const getBooks = async () => {
      const res = await axios.get("/api/books");
      setBooks(res.data);
      setLoading(false);
      console.log(res.data);
    };

    getBooks();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`/api/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowEditBookModal = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const handleCreateBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <Container className="my-4">
      <h2>Book List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>Loading...</>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category.category}</td>
                <td>
                  <td>
                    <img
                      src={`http://localhost:8000/uploads/${book.image_path}`}
                      alt="Book Cover"
                      width="50"
                      height="70"
                    />
                  </td>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleShowEditBookModal(book)}
                  >
                    Edit
                  </Button>
                  {"  "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleCreateModalOpen}>
        Create New Book
      </Button>
      <CreateBookModal
        show={showCreateModal}
        handleClose={handleCreateModalClose}
        handleCreate={handleCreateBook}
      />
      <EditBookModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        book={selectedBook}
      />
    </Container>
  );
};

export default Books;
