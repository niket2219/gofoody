import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-sucess">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>

            {localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link to="/orderpage">
                  <button
                    type="button"
                    className="btn btn-primary position-relative mx-3 my-1"
                  >
                    My Cart
                    <span className="position-absolute top-0 start-0 translate-middle badge rounded-pill bg-danger"></span>
                  </button>
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger my-1"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div classNameName="d-flex">
                <Link to="/login">
                  <button type="button" className="btn btn-primary mx-2">
                    Login
                  </button>
                </Link>
                <Link to="/createuser">
                  <button type="button" className="btn btn-success mx-2">
                    signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
