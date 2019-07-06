import React, { Component } from "react";
import Axios from "axios";
import { BE_Host } from "../../config";

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", text: "" };
  }

  componentWillMount() {
    Axios.get(
      `http://${BE_Host}/blog/get/${this.props.uid}`
    ).then(Response => {
      this.setState({
        title: Response.data.posts[0].title,
        text: Response.data.posts[0].text,
        uid: this.props.uid
      });
    });
  }
  async onSubmit(title, text) {
    console.log("btnpressed2", `http://${BE_Host}/blog/edit/${this.state.uid}`)
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    console.log("test")
    const response = await Axios.post(`http://${BE_Host}/blog/edit/${this.state.uid}`, {
      title,
      text
    });
    console.log("test")
    console.log(response)
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
                value={this.state.title}

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
                value={this.state.text}
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
                console.log("btnpressed");
                this.onSubmit(this.state.title, this.state.text);
              }}
            >
              Editează
        </div>
          </form>
        </div>
      </div>)
  }
}

export default EditPost;
