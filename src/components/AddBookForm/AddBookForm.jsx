import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";

function AddBookForm({ onAddBook }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    imageUrl: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook({
      ...formData,
      id: Date.now().toString(), // Einfache ID-Generierung für das Beispiel
    });
    // Formular zurücksetzen
    setFormData({
      title: "",
      author: "",
      description: "",
      imageUrl: "",
    });
    // Formular schliessen
    setIsFormOpen(false);
  };

  return (
    <div className="my-4">
      {!isFormOpen ? (
        <Button
          variant="success"
          className="w-100 py-3"
          onClick={() => setIsFormOpen(true)}
        >
          <FaPlus className="me-2" /> Neues Buch hinzufügen
        </Button>
      ) : (
        <Card className="border-success">
          <Card.Header className="bg-success text-white">
            <h5 className="mb-0">Neues Buch hinzufügen</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="bookTitle">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="bookAuthor">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="bookDescription">
                <Form.Label>Beschreibung</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="bookImageUrl">
                <Form.Label>Bild-URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/book-cover.jpg"
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit">
                  Buch hinzufügen
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsFormOpen(false)}
                >
                  <FaTimes className="me-1" /> Abbrechen
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default AddBookForm;