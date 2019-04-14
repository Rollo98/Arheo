import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
    console.log(this.props)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">
            Arheo
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
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
              {this.props.role.includes("admin")?<>
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
                </>:null
              }
              {this.props.isAuth ? (
                <>
                  {!this.props.saveState ? (
                    <li className="nav-item">
                      <Link className="nav-link" to="/NewArcheologist">
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
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function MapStateToProps(state) {
  return {
    role: state.auth.role,
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(
  MapStateToProps,
  actions
)(Header);
