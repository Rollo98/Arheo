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
        <nav className="navbar" expand="sm">
          <Link className="navbar-brand" to="/">
            ArheoApp
          </Link>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <nav className="ml-auto">
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

              {this.props.isAuth ? (
                <>
                  {!this.props.saveState ? (
                    <li className="nav-item">
                      <Link
                        className="nav-link btn btn-primary"
                        to="/NewArcheologist"
                      >
                        New Archeologist
                      </Link>
                    </li>
                  ) : null}
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/SignIn"
                      onClick={this.signOut}
                    >
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : null}
            </nav>
          </Navbar.Collapse>
        </nav>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(
  MapStateToProps,
  actions
)(Header);
