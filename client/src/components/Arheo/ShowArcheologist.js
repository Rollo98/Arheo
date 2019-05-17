import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
var moment = require("moment");
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
          <h4>{n.title}</h4>
          <p>{n.text}</p>
        </div>
      ));
    }
    return x;
  }

  renderInstitution() {
    const { institution } = this.state.archeologist;
    let x;
    if (institution !== undefined) {
      x = institution.map(n => {
        return (
          <div key={n._id}>
            <p>{n}</p>
          </div>
        )
      });
    }
    return x;
  }

  renderUniversity() {
    const { university } = this.state.archeologist;
    let x;
    if (university !== undefined) {
      x = university.map(n => (
        <div key={n._id}>
          <p>{n}</p>
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
          <p>{n}</p>
        </div>
      ));
    }
    return x;
  }

  render() {
    console.log(this.state.archeologist.deathDay);
    return (
      <div className="arheoDetails row">
        <div className="col-xl-8 col-lg-8 col-md-12 details">
          <h3>Work</h3>
          {this.renderWorks()}
          <h3>Institution</h3>
          {this.renderInstitution()}
          <h3>University</h3>
          {this.renderUniversity()}
          <h3>Specialization</h3>
          {this.renderSpecialization()}
        </div>
        <div className="text-center mt-2 col-xl-4 col-lg-4 col-md-12 lol">
          <img
            className="img-fluid showImg"
            src={`http://localhost:5000${this.state.archeologist.photo}`}
          />
          <p className="arheoname">
            <b>{`${this.state.archeologist.firstName} ${
              this.state.archeologist.lastName
              }`}</b>
          </p>
          <p>
            <b>Birth day: {moment(this.state.birthDay).format("L")}</b>
            <br />
            {this.state.archeologist.deathDay === undefined ? null : (
              <b>Death day: {moment(this.state.deathDay).format("L")}</b>
            )}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary m-2"
          onClick={() => {
            //do something
          }}
        >
          Editeaza
        </button>
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={() => {
            //do something
          }}
        >
          Delete
        </button>
      </div>
    );
  }
}
