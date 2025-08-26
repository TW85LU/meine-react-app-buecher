// GEÄNDERT: Verwende React Bootstrap für den Spinner
import { Spinner } from "react-bootstrap";

function LoadingSpinner({ message = "Laden..." }) {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" role="status" variant="primary" />
      <p className="mt-3">{message}</p>
    </div>
  );
}

export default LoadingSpinner;