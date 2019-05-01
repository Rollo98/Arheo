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
      console.log(Response.data.archeologists);
    });
  }

  renderWorks() {
    const { works } = this.state.archeologist;
    let x;
    // console.log(typeof works);
    if (works !== undefined && works.lenght > 0) {
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
    if (institution !== undefined && institution.lenght > 0) {
      x = institution.map(n => (
        <div key={n._id}>
          <p>aosd</p>
        </div>
      ));
    }
    return x;
  }

  render() {
    return (
      <div>
        {this.renderWorks()}
        {this.renderInstitution()}
      </div>
    );
  }
}
