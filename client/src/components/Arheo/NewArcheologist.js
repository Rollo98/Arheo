import React, { Component } from "react";
import { Field } from "redux-form";
import CustomInput from "./../CustomInput";
import CustomTextarea from "./../CustomTextarea";
import * as actions from "./../../actions";
import Work from "./Work";
import props from "../../pages/App";

export default class NewArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthDay: "",
      deathDay: "",
      institution: "",
      specialization: "",
      university: "",
      works: [
        {
          start: "",
          end: "",
          title: "",
          text: ""
        }
      ],
      dataModified: "",
      photo: "",
      author: "",
      workCount: 1
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(formData) {
    formData.date = new Date();
    await this.props.NewArcheologist(formData);
    if (!this.props.errorMessage) {
      this.props.history.push("/");
    }
  }

  handleWork() {
    let x = this.state.works.map(n => <Work />);
    return x;
  }

  handleAdd = e => {
    this.setState(prevState => ({
      workCount: this.state.workCount + 1,
      works: [...prevState.works, { title: "", text: "", start: "", end: "" }]
    }));
  };

  sendChanges() {
    let data = this.state;
    console.log(data);
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={this.sendChanges}>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              onChange={e => this.setState({ firstName: e.target.value })}
            />
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              onChange={e => this.setState({ lastName: e.target.value })}
            />
            <input
              type="text"
              name="birthDay"
              className="form-control"
              placeholder="Birthday"
              onChange={e => this.setState({ birthDay: e.target.value })}
            />
            <input
              type="text"
              name="deathDay"
              className="form-control"
              placeholder="Death day"
              onChange={e => this.setState({ deathDay: e.target.value })}
            />
            <input
              type="text"
              name="institution"
              className="form-control"
              placeholder="Institution"
              onChange={e => this.setState({ institution: e.target.value })}
            />
            <input
              type="text"
              name="specialization"
              className="form-control"
              placeholder="Specialization"
              onChange={e => this.setState({ specialization: e.target.value })}
            />
            <input
              type="text"
              name="university"
              className="form-control"
              placeholder="University"
              onChange={e => this.setState({ university: e.target.value })}
            />
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder="Author"
              onChange={e => this.setState({ author: e.target.value })}
            />
            {this.state.works.map(work => {
              return (
                <div className="workForm" key={work._id}>
                  <h2 className="">{`Work: ${this.state.workCount}`}</h2>
                  <label for="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    placeholder="Title"
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                  <label for="text">Text:</label>

                  <input
                    type="text"
                    id="text"
                    name="text"
                    className="form-control"
                    placeholder="Text"
                    onChange={e => this.setState({ text: e.target.value })}
                  />
                  <label for="start">Start:</label>

                  <input
                    type="text"
                    id="start"
                    name="start"
                    className="form-control"
                    placeholder="Start"
                    onChange={e => this.setState({ start: e.target.value })}
                  />
                  <label for="end">End:</label>

                  <input
                    type="text"
                    id="end"
                    name="end"
                    className="form-control"
                    placeholder="End"
                    onChange={e => this.setState({ end: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={this.handleAdd}
                    className="btn btn-danger ml-2"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={this.handleAdd}
                    className="btn btn-success ml-2"
                  >
                    +
                  </button>
                </div>
              );
            })}

            {console.log("this is the motherfucking state", this.state)}
            {this.props.errorMessage ? (
              <div className="alert  alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}
            <button type="submit" className="btn mt-2 btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
