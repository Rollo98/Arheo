import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";

import * as actions from "../actions";

class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    this.props.SignOut();
  }
  render() {
    return (
      <div>
        <Navbar
          className="sticky-top navbar text-center navbar-expand-lg navbar-dark bg-dark"
          expand="sm"
        >
          <Link className="navbar-brand text-white" to="/">
            Arheo
          </Link>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {!this.props.isAuth ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/SignUp">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/SignIn">
                      Sign In
                    </Link>
                  </li>
                </>
              ) : null}
              {this.props.role.includes("admin") ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      Acasa
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Dashboard">
                      Dashboard
                    </Link>
                  </li>
                </>
              ) : null}
              {this.props.role.includes("writer") ? (
                <>
                  {!this.props.saveState ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/NewArcheologist">
                        New Archeologist
                      </Link>
                    </li>
                  ) : null}
                </>
              ) : null}
              {this.props.isAuth ? (
                <>
                  <li className="nav-item">
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary customButton dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {this.props.userName}
                      </button>
                      <div
                        className="dropdown-menu dropdownCustom dropdown-menu-right text-center"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link
                          className="dropdown-item dropitemCustom nav-link"
                          to="/account"
                        >
                          Profil
                        </Link>
                        <Link
                          className="dropdown-item dropitemCustom nav-link"
                          to="/"
                          onClick={this.signOut}
                        >
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  </li>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return {
    userName: state.auth.userName,
    role: state.auth.role,
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(
  MapStateToProps,
  actions
)(Header);
