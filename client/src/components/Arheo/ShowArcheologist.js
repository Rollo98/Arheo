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
        );
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
          <h3>Institutii</h3>
          {this.renderInstitution()}
          <h3>Specializari</h3>
          {this.renderSpecialization()}
          <h3>Studii</h3>
          {this.renderUniversity()}
          {/* <h3>Work</h3>
          {this.renderWorks()} */}
          <h3>Santier</h3>
          <h3>Domeniul specializarii</h3>
          <h3>Lucrari</h3>
          <h3>Observatii</h3>
          <h3>Autor</h3>
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
      </div>
    );
  }
}
