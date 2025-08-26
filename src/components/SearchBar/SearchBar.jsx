import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="mb-4">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Suche nach Buchtitel, Autor, ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Suchbegriff"
          />
          <Button variant="primary" type="submit">
            <FaSearch className="me-1" /> Suchen
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default SearchBar;