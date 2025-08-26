import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { getGoogleBookById } from "../../services/googleBooksService";
import { useFavorites } from "../../context/FavoritesContext";

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchBookDetails() {
      try {
        setLoading(true);
        const bookData = await getGoogleBookById(id);
        setBook(bookData);
        setError(null);
      } catch (err) {
        setError("Fehler beim Laden der Buchdetails.");
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Buchdetails werden geladen...</p>
      </Container>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!book) {
    return <Alert variant="warning">Buch nicht gefunden.</Alert>;
  }

  const isBookFavorite = isFavorite(book.id);

  return (
    <Container>
      <Link to="/search" className="btn btn-outline-primary mb-4">
        &larr; Zurück zur Suche
      </Link>

      <Card>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center mb-4 mb-md-0">
              <img
                src={
                  book.imageUrl ||
                  "https://via.placeholder.com/200x300?text=Kein+Bild"
                }
                alt={`Cover von ${book.title}`}
                className="img-fluid shadow-sm"
                style={{ maxHeight: "300px" }}
              />
              <div className="mt-3">
                <Button
                  variant={isBookFavorite ? "danger" : "outline-danger"}
                  className="w-100 mb-2"
                  onClick={() => toggleFavorite(book)}
                >
                  {isBookFavorite
                    ? "Aus Favoriten entfernen"
                    : "Zu Favoriten hinzufügen"}
                  {isBookFavorite ? " ❤️" : " 🤍"}
                </Button>

                {book.previewLink && (
                  <Button
                    href={book.previewLink}
                    target="_blank"
                    variant="primary"
                    className="w-100"
                  >
                    Vorschau bei Google Books
                  </Button>
                )}
              </div>
            </Col>

            <Col md={8}>
              <Card.Title as="h1">{book.title}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                von {book.author}
              </Card.Subtitle>

              {book.publishedDate && (
                <p className="text-muted mb-2">
                  Veröffentlicht: {book.publishedDate}
                </p>
              )}

              {book.pageCount && book.pageCount !== "Unbekannt" && (
                <p className="text-muted mb-2">{book.pageCount} Seiten</p>
              )}

              {book.categories && book.categories.length > 0 && (
                <div className="mb-3">
                  <strong>Kategorien:</strong>
                  <br />
                  {book.categories.map((category, index) => (
                    <Badge bg="secondary" className="me-1 mb-1" key={index}>
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              <Card.Text className="mt-4">
                <h5>Beschreibung</h5>
                <div dangerouslySetInnerHTML={{ __html: book.description }} />
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BookDetailsPage;