import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class ArheoList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.notes = {};
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
    const notes = Object.values(this.state.notes);
    var x = notes.map(n => (
      <div key={n.date}>
        <h2>
          <Link to={`/note/${n.title}:${n.date}`}>{n.title}</Link>
        </h2>
      </div>
    ));
    return x;
  }

  render() {
    return <div>{this.renderUsers()}</div>;
  }
}
