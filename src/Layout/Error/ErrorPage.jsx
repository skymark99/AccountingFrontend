// src/Pages/ErrorPage/ErrorPage.js
import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
  // Get the error data from the route
  const error = useRouteError();

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p style={{ color: "red" }}>{error.statusText || error.message}</p>
      <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
        Go back to Home
      </Link>
    </div>
  );
}

export default ErrorPage;
