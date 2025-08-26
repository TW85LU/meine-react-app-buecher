import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

function BookCard({ book }) {
  const { id, title, author, imageUrl, description } = book;
  const { isFavorite, toggleFavorite } = useFavorites();

  const isBookFavorite = isFavorite(id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(book);
  };

  return (
    <Card className="h-100">
      <Link to={`/book/${id}`} className="text-decoration-none text-dark">
        <div className="d-flex h-100">
          <div style={{ width: "130px" }}>
            <Card.Img
              src={
                imageUrl || "https://via.placeholder.com/130x200?text=Kein+Bild"
              }
              alt={`Cover von ${title}`}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </div>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
            <Card.Text>
              {description
                ? description.length > 150
                  ? `${description.substring(0, 150)}...`
                  : description
                : "Keine Beschreibung verfügbar"}
            </Card.Text>
            <span className="text-primary">Details anzeigen</span>
          </Card.Body>
        </div>
      </Link>
      <Card.Footer className="bg-white border-top-0 text-end">
        <Button
          variant={isBookFavorite ? "danger" : "outline-danger"}
          size="sm"
          onClick={handleFavoriteClick}
        >
          {isBookFavorite ? "❤️" : "🖤"}
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default BookCard;