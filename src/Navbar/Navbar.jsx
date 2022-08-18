import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  let [Term, setTerm] = useState("");
  let navigate = useNavigate();
  function search(term) {
    navigate(`/search/${term}`);
  }
  return (
    <nav className="navbar navbar-expand-lg bg-transparent navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Noxe
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {props.userData ? (
            <>
              {" "}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tvshow">
                    Tv Show
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/people">
                    People
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                {
                  //   <li className="nav-item">
                  //   <Link className="nav-link" to="/networks">
                  //     Networks
                  //   </Link>
                  // </li>
                }
              </ul>
              <form
                onSubmit={() => search(Term)}
                className="d-flex"
                role="search"
              >
                <input
                  onChange={(e) => setTerm(e.target.value)}
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            </>
          ) : (
            ""
          )}
          <ul className="list-unstyled d-flex ms-auto mb-0 navbar-nav">
            {!props.userData ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <span onClick={props.logOut} className="nav-link">
                    Logout
                  </span>
                </li>
                <li className="nav-item mx-2">
                  <span className="nav-link">
                    Hello{" , "}
                    {`${props.userData["first_name"]} ${props.userData["last_name"]}`}
                  </span>
                </li>
              </>
            )}
          </ul>
          <ul className="list-unstyled d-flex mb-0">
            <li className="mx-2">
              <i className="fab fa-facebook"></i>
            </li>
            <li className="mx-2">
              <i className="fab fa-twitter"></i>
            </li>
            <li className="mx-2">
              <i className="fab fa-instagram"></i>
            </li>
            <li className="mx-2">
              <i className="fab fa-spotify"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
