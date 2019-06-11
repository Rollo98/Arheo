import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import profilePic from "../Image/test2.svg";
import { BE_Host } from "../../config";
import { connect } from "react-redux";

var moment = require("moment");

class ShowArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.archeologist = {};
  }

  async componentWillMount() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get(
      `http://${BE_Host}/archeologist/get/${this.props.firstName}/${
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
  //here add start/end
  renderWithTime(typeOfData) {
    const variable = this.state.archeologist[`${typeOfData}`];
    let x;
    console.log("renderWtime", variable);
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>
          <p>{n.text}</p>
          <p>
            {n.start} - {n.end}
          </p>
        </div>
      ));
    }
    return x;
  }

  renderWithoutTime(typeOfData) {
    const variable = this.state.archeologist[`${typeOfData}`];
    let x;
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>
          <p>{n.text}</p>
        </div>
      ));
    }
    return x;
  }

  render() {
    console.log("props", this.props.role);
    return (
      <div className="arheoDetails row">
        <div className="col-xl-8 col-lg-8 col-md-12 details">
          <h3>Institutii</h3>
          {this.renderWithTime("Institutii")}
          <h3>Specializari</h3>
          {this.renderWithTime("Specializarii")}
          <h3>Studii</h3>
          {this.renderWithTime("Studii")}
          <h3>Santier</h3>
          {this.renderWithTime("Santier")}
          <h3>Domeniul specializarii</h3>
          {this.renderWithoutTime("Domeniu")}
          <h3>Lucrari</h3>
          {this.state.archeologist.Lucrari}
          <h3>Observatii</h3>
          {this.state.archeologist.Observatii}
          <h3>Autor</h3>
          {this.state.archeologist.author}
          <br />
          {this.props.role.includes("writer") ||
          this.props.role.includes("admin") ? (
            <button
              className="btn btn-primary saveButton"
              onClick={() =>
                this.props.history.push(
                  `${this.state.archeologist.firstName}:${
                    this.state.archeologist.lastName
                  }/edit`
                )
              }
            >
              Edit
            </button>
          ) : null}
        </div>
        <div className="text-center mt-2 col-xl-4 col-lg-4 col-md-12 lol">
          {this.state.archeologist.photo == "" ? (
            <img className="img-fluid showImg" src={profilePic} />
          ) : (
            <img
              className="img-fluid showImg"
              src={`http://${BE_Host}${this.state.archeologist.photo}`}
            />
          )}
          <p className="arheoname">
            <b>{`${this.state.archeologist.firstName} ${
              this.state.archeologist.lastName
            }`}</b>
          </p>
          <p>
            {this.state.archeologist.birthDay !== undefined ? (
              <b>
                Birth day:
                {this.state.archeologist.birthDay.day}/
                {this.state.archeologist.birthDay.month}/
                {this.state.archeologist.birthDay.year}
              </b>
            ) : null}
            <br />
            {this.state.archeologist.deathDay !== undefined ? (
              <b>
                Death day:
                {this.state.archeologist.deathDay.day}/
                {this.state.archeologist.deathDay.month}/
                {this.state.archeologist.deathDay.year}
              </b>
            ) : null}
          </p>
        </div>
      </div>
    );
  }
}
function MapStateToProps(state) {
  return {
    role: state.auth.role
  };
}

export default connect(MapStateToProps)(ShowArcheologist);
