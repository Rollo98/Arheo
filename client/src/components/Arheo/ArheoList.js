import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import profilePic from "../Image/test2.svg";
import { BE_Host } from "../../config";

export default class ArheoList extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", archeologists: [] };
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get(`http://${BE_Host}/archeologist/get`).then(Response => {
      this.setState({ archeologists: Response.data.archeologists });
      console.log("Response.data", Response.data);
    });
  }

  renderUsers() {
    const archeologists = Object.values(this.state.archeologists).filter(
      archeologist =>
        archeologist.firstName.indexOf(this.state.search) !== -1 ||
        archeologist.lastName.indexOf(this.state.search) !== -1
    );
    var x = archeologists.map(n => (
      <Link
        className="userLink card col-xl-2 col-lg-3 col-md-3 m-2"
        to={`/${n.firstName}:${n.lastName}`}
        key={n._id}
      >
        {n.photo === "" || n.photo === undefined ? (
          <img
            className="card-img-top profileImg mt-2"
            src={profilePic}
            alt="Avatar"
          />
        ) : (
          <img
            className="card-img-top profileImg mt-2"
            src={`http://${BE_Host}${n.photo}`}
            alt="Avatar"
          />
        )}
        <hr />
        <div className="card-body">
          <h5 className="card-title">
            {n.firstName} {n.lastName}
          </h5>
        </div>
      </Link>
    ));
    return x;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="row dashboard mb-5">
        <input
          autoComplete="off"
          name="search"
          type="text"
          value={this.state.search}
          className="form-control mt-2 searchBar"
          placeholder="Search..."
          aria-label="Search"
          onChange={this.handleChange}
        />
        {this.renderUsers()}
      </div>
    );
  }
}
