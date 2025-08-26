import { Container, Alert } from "react-bootstrap";
import BookList from "../../components/BookList/BookList";
import { useFavorites } from "../../context/FavoritesContext";

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <Container>
      <h1>Meine Favoriten</h1>

      {favorites.length > 0 ? (
        <>
          <Alert variant="success">
            Sie haben {favorites.length}{" "}
            {favorites.length === 1 ? "Buch" : "Bücher"} in Ihren Favoriten
          </Alert>
          <BookList books={favorites} />
        </>
      ) : (
        <Alert variant="info">
          <Alert.Heading>Keine Favoriten</Alert.Heading>
          <p>
            Sie haben noch keine Bücher zu den Favoriten hinzugefügt. Füge
            Bücher hinzu, indem Sie auf das Herz-Symbol auf der Buchkarte
            klicken.
          </p>
        </Alert>
      )}
    </Container>
  );
}

export default FavoritesPage;