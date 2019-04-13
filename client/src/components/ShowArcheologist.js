import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class ShowArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.Archeologist = {};
  }

  async componentWillMount() {
    let data = { title: this.props.title, date: this.props.date };
    await Axios.post(
      "http://localhost:5000/Archeologists/get_Archeologist",
      data
    ).then(Response =>
      this.setState({ Archeologist: Response.data.ArcheologistFound[0] })
    );
  }

  render() {
    return (
      <div>
        <h1>{this.state.Archeologist.title}</h1>
        <div>{this.state.Archeologist.body}</div>
      </div>
    );
  }
}
