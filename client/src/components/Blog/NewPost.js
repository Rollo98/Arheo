import React, { Component } from "react";
import { BE_Host } from "../../config";
import Axios from "axios";
import id from "short-id";


class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", text: "" };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(title, text) {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    const response = await Axios.post(`http://${BE_Host}/blog/add`, {
      title,
      text,
      uid: id.generate()
    });
    if (!response.error) {
      this.props.history.push("/Blog");
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={this.sendChanges}>
            <div className="col">
              <label htmlFor="title">Titlu:</label>
              <input
                id="title"
                type="text"
                name="title"
                className="form-control"
                onChange={e => this.setState({ title: e.target.value })}
              />
            </div>
            <div className="col">
              <label htmlFor="text">Text:</label>
              <textarea
                id="text"
                type="text"
                name="text"
                className="form-control"
                onChange={e => this.setState({ text: e.target.value })}
              />
            </div>
            {this.props.errorMessage ? (
              <div className="alert  alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}
            <div
              className="btn mt-2 saveButton btn-primary"
              onClick={() => {
                this.onSubmit(this.state.title, this.state.text);
              }}
            >
              Adaugă
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewPost;
