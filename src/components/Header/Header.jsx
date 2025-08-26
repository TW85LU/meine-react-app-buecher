import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

function Header() {
  const { favorites } = useFavorites();
  const favoritesCount = favorites.length;

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          📚 Bücher-Projekt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Startseite
            </Nav.Link>
            <Nav.Link as={NavLink} to="/search">
              Bücher suchen
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
              Favoriten
              {favoritesCount > 0 && (
                <Badge bg="danger" pill className="ms-1">
                  {favoritesCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;