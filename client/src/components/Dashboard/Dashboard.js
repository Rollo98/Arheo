import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BE_Host } from '../../config'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotData: true,
      users: [],
      search: ""
    };
  }

  async componentWillMount() {
    const currentUser = localStorage.getItem("uNema");
    this.setState({ currentUser });
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    let Response = await Axios.get(`http://${BE_Host}/`);
    if (Response) {
      this.setState({ users: Response.data.foundUsers, gotData: true });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderUserList() {
    const users = Object.values(this.state.users).filter(
      user =>
        user.userName.indexOf(this.state.search) !== -1 ||
        user.email.indexOf(this.state.search) !== -1
    );
    let x = "";
    if (users.length > 0) {
      x = users.map(n => {
        if (n.userName !== this.state.currentUser)
          return (
            <Link className="userLink" to={`/dashboard/${n.userName}`}>
              <div className="m-2 user" key={n.userName}>
                <div className="row text-center m-2 p-2">
                  <h5 className="col">
                    <b>Username</b>: {n.userName}
                  </h5>
                  <h5 className="col">
                    <b>Email</b>: {n.email}
                  </h5>
                </div>
              </div>
            </Link>
          );
      });
    }

    return x;
  }

  render() {
    let userList = "";
    console.log(this.state)
    if (this.state.gotData) {
      userList = this.renderUserList();
    }
    return (
      <div className="mt-2 dashboard">
        <input
          autoComplete="off"
          name="search"
          type="text"
          value={this.state.search}
          className="form-control searchBar"
          placeholder="Search..."
          aria-label="Search"
          onChange={this.handleChange}
        />
        {userList}
      </div>
    );
  }
}
