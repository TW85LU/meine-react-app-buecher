import { Row, Col, Alert } from "react-bootstrap";
import BookCard from "../BookCard/BookCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

// ÄNDERUNG: Komplett überarbeitet mit React Bootstrap Grid-System
function BookList({ books, loading }) {
  // Wenn Bücher geladen werden, zeige einen Ladezustand an
  if (loading) {
    return <LoadingSpinner message="Bücher werden geladen..." />;
  }

  // Wenn keine Bücher vorhanden sind, zeige eine Nachricht an
  if (!books || books.length === 0) {
    return <Alert variant="secondary">Keine Bücher gefunden.</Alert>;
  }

  return (
    <Row xs={1} md={1} lg={1} className="g-4">
      {books.map((book) => (
        <Col key={book.id}>
          <BookCard book={book} />
        </Col>
      ))}
    </Row>
  );
}

export default BookList;