import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class ArheoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.archeologists = [{}];
  }

  componentDidMount() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get("http://localhost:5000/archeologist/get").then(Response => {
      this.setState({ archeologists: Response.data.archeologists });
      console.log("Response.data", Response.data);
    });
  }

  renderUsers() {
    const { archeologists } = this.state;
    var x = archeologists.map(n => (
      <Link
        className="userLink card col-lg-3 m-2"
        to={`/${n.firstName}:${n.lastName}`}
        key={n._id}
      >
        <img
          className="card-img-top mt-2"
          src={`http://localhost:5000${n.photo}`}
          alt="Card image cap"
        />
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

  render() {
    return <div className="row">{this.renderUsers()}</div>;
  }
}
