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
        <Navbar className="navbar" expand="sm">
          <Link className="navbar-brand text-white" to="/">
            SecPark
          </Link>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              {!this.props.isAuth ? (
                <>
                  <Link className="nav-link text-white" to="/SignIn">
                    Sign In
                  </Link>
                </>
              ) : null}
              {this.props.isAuth ? (
                <>
                  {!this.props.saveState ? (
                    <Link className="nav-link text-white" to="/Request">
                      Request Park
                    </Link>
                  ) : null}
                  <Link
                    className="nav-link text-white"
                    to="/"
                    onClick={this.signOut}
                  >
                    Sign Out
                  </Link>
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
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(
  MapStateToProps,
  actions
)(Header);
