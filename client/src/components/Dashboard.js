import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

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
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    let Response = await Axios.get("http://localhost:5000/");
    if (Response) {
      this.setState({ users: Response.data.foundUsers, gotData: true });
      console.log("Useeers", Response.data);
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
      x = users.map(n => (
        <div className="m-2 user" key={n.userName}>
          {/* <Link to={`/dashboard/${n.userName}`}>{n.userName}</Link> */}
          <Link
            className="userLink row text-center m-2 p-2"
            to={`/dashboard/${n.userName}`}
          >
            <h5 className="col">
              <b>Username</b>: {n.userName}
            </h5>
            <h5 className="col">
              <b>Email</b>: {n.email}
            </h5>
          </Link>
        </div>
      ));
    }
    return x;
  }

  render() {
    let userList = "";
    if (this.state.gotData) {
      userList = this.renderUserList();
    }
    return (
      <div className="dashboard">
        Dashboard
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
//   renderUsers() {
//     const users = Object.values(this.state.users).filter(
//       user =>
//         user.userName.indexOf(this.state.search) !== -1 ||
//         user.email.indexOf(this.state.search) !== -1
//     );
//     var x = users.map(n => (
//       <div className="m-2 p-2 text-center row user" key={n._id}>
//         <h5 className="col">
//           <b>Username</b>: {n.userName}
//         </h5>
//         <h5 className="col">
//           <b>Email</b>: {n.email}
//         </h5>
//       </div>
//     ));
//     return x;
//   }

//   render() {
//     return (
//       <div className="dashboard">
//         <p>Dashboard</p>
//         <input
//           autoComplete="off"
//           name="search"
//           type="text"
//           value={this.state.search}
//           className="form-control searchBar"
//           placeholder="Search..."
//           aria-label="Search"
//           onChange={this.handleChange}
//         />
//         {this.renderUsers()}
//       </div>
//     );
//   }
// }
