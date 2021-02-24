import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

import AuthService from "../../services/auth-service";

const Navbar = () => {
  let { user, isAuthenticated } = useAuth0();

  const [state, setState] = useState({
    showModeratorBoard: false,
    showAdminBoard: false,
    currentUser: undefined,
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_COMPANY"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }, []);

  function logOut() {
    AuthService.logout();
  }

  if (isAuthenticated) {
    localStorage.setItem("username", user.nickname);
  }

  if (localStorage.getItem("username")) {
    isAuthenticated = true;
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-expand-lg navbar-dark bg-primary ">
        <a className="navbar-brand" href="/news">
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="jobify"
            style={{ width: "150px" }}
          ></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Jobs
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/news">
                News
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/users/lookingForJob">
                Developers
              </a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/companies">
                Companies
              </a>
            </li>

            <li className="nav-item">
              {state.currentUser &&
              state.currentUser.roles.includes("ROLE_ADMIN") ? (
                <a href="/companies/addCompany" className="nav-link">
                  Add a company
                </a>
              ) : (
                ""
              )}
            </li>
            {state.currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  {state.currentUser &&
                  state.currentUser.roles.includes("ROLE_COMPANY") ? (
                    <Link
                      to={`/company/${state.currentUser.id}`}
                      className="nav-link"
                    >
                      {state.currentUser.username}
                    </Link>
                  ) : (
                    <Link
                      to={`/user/myProfile/${state.currentUser.id}`}
                      className="nav-link"
                    >
                      {state.currentUser.username}
                    </Link>
                  )}
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <NavDropdown title="Sign Up" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/user/register">
                    User Registration
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/register/company">
                    Company Registration
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </ul>
          {isAuthenticated && <Link to="/profile">User Profile</Link>}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
