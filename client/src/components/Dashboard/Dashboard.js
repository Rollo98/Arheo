import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotData: true,
      users: []
    };
  }

  async componentWillMount() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    let Response = await Axios.get("http://localhost:5000/")
    if (Response) {
      this.setState({ users: Response.data.foundUsers, gotData: true });
    };
  }

  renderUserList() {
    const users = Object.values(this.state.users);
    let x = ""
    if (users.length > 0) {
      x = users.map(n =>
        (
          <div key={n.userName}>
            <h2>
              <Link to={{ pathname: `/dashboard/${n.userName}`, state: { modal: true } }}>{n.userName}</Link>
            </h2>
          </div>
        )
      )
    }
    return x;
  }

  render() {
    let userList = ""
    if (this.state.gotData) {
      userList = this.renderUserList()
    }
    return (
      <div>
        Dashboard
        {userList}
      </div>
    );
  }
}
