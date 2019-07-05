import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import profilePic from "../Image/test2.svg";
import { BE_Host } from "../../config";
import { connect } from "react-redux";
import queryString from 'query-string'
import Popup from "./Popup";

var moment = require("moment");

class ShowArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
    this.state.archeologist = {};
  }

  async componentWillMount() {
    console.log(this.props.location.search)
    const values = queryString.parse(this.props.location.search)
    console.log(values)
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    Axios.get(`http://${BE_Host}/archeologist/get/?prenume=${values.prenume}&numeDeFamilie=${values.numeDeFamilie}`
    ).then(Response => {
      this.setState({ archeologist: Response.data.archeologists[0] });
      console.log(
        "Response from details archeo",
        Response.data.archeologists[0]
      );
    });
  }

  handleDelte() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    const response = Axios.delete(`http://${BE_Host}/archeologist/${this.state.archeologist.prenume}/${this.state.archeologist.numeDeFamilie}/delete`);
    if (!response.error) {
      this.props.history.push("/");
    }
  }
  //here add start/end
  renderWithTime(typeOfData) {
    if (this.state.archeologist === undefined || this.state.archeologist[`${typeOfData}`] === undefined || this.state.archeologist[`${typeOfData}`].length == 0)
      return ""
    const variable = this.state.archeologist[`${typeOfData}`];
    let x;
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>
          {n.text !== "" ? (
            <>
              <p>{n.text}</p>
              <p>
                {n.start} - {n.end}
              </p>
            </>
          ) : null}
        </div>
      ));
    }
    return x;
  }

  renderWithoutTime(typeOfData) {
    if (this.state.archeologist === undefined || this.state.archeologist.Studii === undefined || this.state.archeologist.Studii.length == 0)
      return ""
    const variable = this.state.archeologist[`${typeOfData}`];
    let x;
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>{n.text !== "" ? <p>{n.text}</p> : null}</div>
      ));
    }
    return x;
  }

  renderStudii() {
    if (this.state.archeologist === undefined || this.state.archeologist.Studii === undefined || this.state.archeologist.Studii.length == 0)
      return ""
    const variable = this.state.archeologist.Studii;
    let x;
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>
          {n.text !== "" ? (
            <>
              <h5>{n.text}</h5>
              <p>
                {n.start} - {n.end}
              </p>
              <h5>{n.licenta_text}</h5>
              <p>
                {n.licenta_start} - {n.licenta_end}
              </p>
              <h5>{n.master_text}</h5>
              <p>
                {n.master_start} - {n.master_end}
              </p>
            </>
          ) : null}
        </div>
      ));
    }
    return x;
  }
  renderDoctorat() {
    if (this.state.archeologist === undefined || this.state.archeologist.Doctorat === undefined || this.state.archeologist.Doctorat.length == 0)
      return ""
    const variable = this.state.archeologist.Doctorat;
    let x;
    if (variable !== undefined) {
      x = variable.map(n => (
        <div key={n}>
          {n.text !== "" ? (
            <>
              <h4>{n.text}</h4>
              <h5>{n.title}</h5>
              <p>{n.coord}</p>
              <p>{n.start}</p>
            </>
          ) : null}
        </div>
      ));
    }
    return x;
  }

  togglePopup() {
    this.setState({ showDetails: !this.state.showDetails });
  }

  render() {
    return (
      <div className="arheoDetails row">
        <div className="col-xl-8 col-lg-8 col-md-12 details">
          {this.state.showDetails ? (
            <>
              <Popup
                bibliografie={this.state.archeologist.Bibliografie}
                closePopup={() => this.togglePopup()}
              />
            </>
          ) : (
              <>
                <h3>Institutii</h3>
                {this.renderWithTime("Institutii")}
                <h3>Specializari</h3>
                {this.renderWithTime("Specializarii")}
                <h3>Studii</h3>
                {this.renderStudii()}
                <h3>Doctorat</h3>
                {this.renderDoctorat()}
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
                    <>
                      <button
                        className="btn btn-primary saveButton"
                        onClick={() =>
                          this.props.history.push(
                            `/arheolog/edit/?prenume=${
                            this.state.archeologist.prenume
                            }&numeDeFamilie=${
                            this.state.archeologist.numeDeFamilie
                            }`
                          )
                        }
                      >
                        Editează
                  </button>
                      <button
                        className="btn btn-danger saveButton float-right"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Sunteți sigur că doriți ștergerea acestui arheolog?"
                            )
                          )
                            this.handleDelte();
                        }}
                      >
                        Șterge
                  </button>
                    </>
                  ) : null}
              </>
            )}
        </div>
        <div className="text-center mt-2 col-xl-4 col-lg-4 col-md-12 lol">
          {this.state.archeologist.photo === "" ? (
            <img className="img-fluid showImg" src={profilePic} />
          ) : (
              <img
                className="img-fluid showImg"
                src={`http://${BE_Host}${this.state.archeologist.photo}`}
              />
            )}
          <p className="arheoname">
            <b>{`${this.state.archeologist.prenume} ${
              this.state.archeologist.numeDeFamilie
              }`}</b>
          </p>
          <p>
            {this.state.archeologist.birthDay !== undefined ? (
              <b>
                Născut :{this.state.archeologist.birthDay.day}/
                {this.state.archeologist.birthDay.month}/
                {this.state.archeologist.birthDay.year}
              </b>
            ) : null}
            <br />
            {this.state.archeologist.deathDay !== undefined ? (
              <b>
                Decedat :{this.state.archeologist.deathDay.day}/
                {this.state.archeologist.deathDay.month}/
                {this.state.archeologist.deathDay.year}
              </b>
            ) : null}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => this.togglePopup()}
          >
            Bibliografie
          </button>
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
