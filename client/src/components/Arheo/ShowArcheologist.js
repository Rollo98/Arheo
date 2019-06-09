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
  //here add start/end 
  renderWithTime(typeOfData) {
    const variable = this.state.archeologist[`${typeOfData}`];
    let x;
    console.log("renderWtime", variable)
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>
          <p>{n.text}</p>
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
    console.log(this.state.archeologist.deathDay);
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
