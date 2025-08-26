import { useState, useEffect } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import Header from "./components/Header/Header";
import BookList from "./components/BookList/BookList";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { searchGoogleBooks } from "./services/googleBooksService";

// ÄNDERUNG: App-Komponente mit React Bootstrap
function App() {
  // State für die angezeigten Bücher
  const [books, setBooks] = useState([]);
  // State für den Ladezustand
  const [loading, setLoading] = useState(false);
  // State für Fehler
  const [error, setError] = useState(null);
  // State für den Suchbegriff
  const [searchTerm, setSearchTerm] = useState("");
  // State für initialen Ladezustand
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Effekt zum Laden einiger Standardbücher beim Start
  useEffect(() => {
    const loadInitialBooks = async () => {
      try {
        setLoading(true);
        // Lade einige populäre Bücher beim Start
        const initialResults = await searchGoogleBooks("bestseller fiction");
        setBooks(initialResults);
        setError(null);
      } catch (err) {
        setError(
          "Fehler beim Laden der initialen Bücher. Bitte versuche es später erneut."
        );
        console.error("Error loading initial books:", err);
      } finally {
        setLoading(false);
        setIsInitialLoad(false);
      }
    };

    loadInitialBooks();
  }, []); // Leeres Abhängigkeitsarray bedeutet: nur einmal beim Mounten ausführen

  // Funktion zum Suchen von Büchern mit der Google Books API
  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (!term.trim()) {
      return; // Keine leere Suche ausführen
    }

    try {
      setLoading(true);
      setError(null);
      const results = await searchGoogleBooks(term);
      setBooks(results);
    } catch (err) {
      setError("Fehler bei der Suche. Bitte versuche es später erneut.");
      console.error("Error searching books:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* ÄNDERUNG: Layout mit React Bootstrap Container und Spacing */}
      <Container className="py-4 flex-grow-1">
        <Row>
          <Col>
            <h2 className="mb-3">Willkommen im Bücher-Projekt</h2>
            <p className="lead mb-4">
              Entdecke neue Bücher und verwalte deine persönliche
              Büchersammlung. Durchsuche Millionen von Büchern aus der Google
              Books-Datenbank.
            </p>

            <SearchBar onSearch={handleSearch} />

            {error && <Alert variant="danger">{error}</Alert>}

            {isInitialLoad ? (
              <LoadingSpinner message="Lade empfohlene Bücher..." />
            ) : (
              <>
                {searchTerm && !loading && !error && (
                  <Alert variant="info" className="mt-3">
                    Ergebnisse für: <strong>{searchTerm}</strong>({books.length}{" "}
                    {books.length === 1 ? "Buch" : "Bücher"} gefunden)
                  </Alert>
                )}

                <h3 className="mt-4 mb-3">
                  {searchTerm ? "Suchergebnisse" : "Empfohlene Bücher"}
                </h3>
                <BookList books={books} loading={loading} />
              </>
            )}
          </Col>
        </Row>
      </Container>

      {/* ÄNDERUNG: Footer mit React Bootstrap */}
      <footer className="bg-light py-3 mt-auto">
        <Container className="text-center">
          <p className="text-muted mb-0">
            &copy; {new Date().getFullYear()} Bücher-Projekt
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default App;