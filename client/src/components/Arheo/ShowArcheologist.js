import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class ShowArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.archeologist = {};
  }

  async componentWillMount() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get(
      `http://localhost:5000/archeologist/get/${this.props.firstName}/${
        this.props.lastName
      }`
    ).then(Response => {
      this.setState({ archeologist: Response.data.archeologists[0] });
      console.log(
        "Response from details archeo",
        Response.data.archeologists[0]
      );
    });
  }

  renderWorks() {
    const { works } = this.state.archeologist;
    let x;
    if (works !== undefined) {
      x = works.map(n => (
        <div key={n._id}>
          <p>
            {n.text},{n.title}
          </p>
        </div>
      ));
    }
    return x;
  }

  renderInstitution() {
    const { institution } = this.state.archeologist;
    let x;
    if (institution !== undefined) {
      x = institution.map(n => (
        <div key={n._id}>
          <p>{JSON.parse(n)}</p>
        </div>
      ));
    }
    return x;
  }

  renderUniversity() {
    const { university } = this.state.archeologist;
    let x;
    if (university !== undefined) {
      x = university.map(n => (
        <div key={n._id}>
          <p>{JSON.parse(n)}</p>
        </div>
      ));
    }
    return x;
  }

  renderSpecialization() {
    const { specialization } = this.state.archeologist;
    let x;
    if (specialization !== undefined) {
      x = specialization.map(n => (
        <div key={n._id}>
          <p>{JSON.parse(n)}</p>
        </div>
      ));
    }
    return x;
  }

  render() {
    return (
      <div>
        <img
          className="mx-auto img-fluid d-block mt-2 profileImg"
          src={`http://localhost:5000${this.state.archeologist.photo}`}
        />
        <br />
        <h2>
          {this.state.archeologist.firstName +
            " " +
            this.state.archeologist.lastName}
        </h2>
        <br />
        <b>Work</b>
        {this.renderWorks()}
        <b>Institution</b>
        {this.renderInstitution()}
        <b>University</b>
        {this.renderUniversity()}
        <b>Specialization</b>
        {this.renderSpecialization()}
      </div>
    );
  }
}
