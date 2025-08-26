import { Container, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-1">404</h1>
      <Alert variant="danger">
        <h2>Seite nicht gefunden</h2>
        <p>Die angeforderte Seite existiert leider nicht.</p>
      </Alert>
      <Button as={Link} to="/" variant="primary">
        Zurück zur Startseite
      </Button>
    </Container>
  );
}

export default NotFoundPage;