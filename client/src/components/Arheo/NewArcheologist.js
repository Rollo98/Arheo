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
      author: ""
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
      works: [...prevState.works, { title: "", text: "", start: "", end: "" }]
    }));
  };

  sendChanges() {
    let data = this.state;
    console.log(data);
  }

  render() {
    return (
      <div className="row text-center">
        <div className="col">
          <form onSubmit={this.sendChanges}>
            <input
              type="text"
              name="firstName"
              className="form-control m-3"
              placeholder="First name"
              onChange={e => this.setState({ firstName: e.target.value })}
            />
            <input
              type="text"
              name="lastName"
              className="form-control m-3"
              placeholder="Last name"
              onChange={e => this.setState({ lastName: e.target.value })}
            />
            <input
              type="datetime-local"
              name="birthDay"
              className="form-control m-3"
              placeholder="Birthday"
              onChange={e => this.setState({ birthDay: e.target.value })}
            />
            <input
              type="datetime-local"
              name="deathDay"
              className="form-control m-3"
              placeholder="Death day"
              onChange={e => this.setState({ deathDay: e.target.value })}
            />
            <input
              type="text"
              name="institution"
              className="form-control m-3"
              placeholder="Institution"
              onChange={e => this.setState({ institution: e.target.value })}
            />
            <input
              type="text"
              name="specialization"
              className="form-control m-3"
              placeholder="Specialization"
              onChange={e => this.setState({ specialization: e.target.value })}
            />
            <input
              type="text"
              name="university"
              className="form-control m-3"
              placeholder="University"
              onChange={e => this.setState({ university: e.target.value })}
            />
            <input
              type="text"
              name="author"
              className="form-control m-3"
              placeholder="Author"
              onChange={e => this.setState({ author: e.target.value })}
            />
            {this.state.works.map(work => {
              return (
                <div key={work._id}>
                  <input
                    type="text"
                    name="title"
                    className="form-control m-3"
                    placeholder="Title"
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                  <input
                    type="text"
                    name="text"
                    className="form-control m-3"
                    placeholder="Text"
                    onChange={e => this.setState({ text: e.target.value })}
                  />
                  <input
                    type="datetime-local"
                    name="start"
                    className="form-control m-3"
                    placeholder="Start"
                    onChange={e => this.setState({ start: e.target.value })}
                  />
                  <input
                    type="datetime-local"
                    name="end"
                    className="form-control m-3"
                    placeholder="End"
                    onChange={e => this.setState({ end: e.target.value })}
                  />
                </div>
              );
            })}

            <button
              type="button"
              onClick={this.handleAdd}
              className="btn btn-success mr-2"
            >
              Add work
            </button>
            {console.log(this.state)}
            {this.props.errorMessage ? (
              <div className="alert  alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
