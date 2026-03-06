import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🍽 FoodHub
        </Link>

        <div className="d-flex">
          <Link className="btn btn-outline-light me-2" to="/">
            Menu
          </Link>

          <Link className="btn btn-outline-light me-2" to="/cart">
            Cart
          </Link>

          <Link className="btn btn-outline-light" to="/analytics">
            Analytics
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;