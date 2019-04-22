import React, { Component } from "react";
import { Field } from "redux-form";
import CustomInput from "./../CustomInput";
import CustomTextarea from "./../CustomTextarea";
import * as actions from "./../../actions";
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
          id: 1,
          start: "",
          end: "",
          title: "",
          text: ""
        }
      ],
      dataModified: "",
      photo: "",
      author: "",
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
  handleDel = e => {
    if (this.state.works.length > 1) {
      const works = this.state.works
      works.pop()
      console.log(works)
      this.setState({ works });
    }
  }
  handleAdd = e => {
    const iD = this.state.works[this.state.works.length - 1].id + 1
    this.setState(prevState => ({
      works: [...prevState.works, { id: iD, title: "", text: "", start: "", end: "" }]
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
            <label for="firstName">FirstName:</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First name"
              onChange={e => this.setState({ firstName: e.target.value })}
            />
            <label for="lastName">LastName:</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last name"
              onChange={e => this.setState({ lastName: e.target.value })}
            />
            <label for="birthDay">BirthDay:</label>
            <input
              id="birthDay"
              type="text"
              name="birthDay"
              className="form-control"
              placeholder="Birthday"
              onChange={e => this.setState({ birthDay: e.target.value })}
            />
            <label for="deathDay">DeathDay:</label>
            <input
              id="deathDay"
              type="text"
              name="deathDay"
              className="form-control"
              placeholder="Death day"
              onChange={e => this.setState({ deathDay: e.target.value })}
            />
            <label for="institution">Institution:</label>
            <input
              id="institution"
              type="text"
              name="institution"
              className="form-control"
              placeholder="Institution"
              onChange={e => this.setState({ institution: e.target.value })}
            />
            <label for="specialization">Specialization:</label>
            <input
              id="specialization"
              type="text"
              name="specialization"
              className="form-control"
              placeholder="Specialization"
              onChange={e => this.setState({ specialization: e.target.value })}
            />
            <label for="university">University:</label>
            <input
              id="university"
              type="text"
              name="university"
              className="form-control"
              placeholder="University"
              onChange={e => this.setState({ university: e.target.value })}
            />
            <label for="workform">Work:</label><br />
            {this.state.works.map(work => {
              return (
                <>
                  <br /> <label for="workform">{`${work.id}`}</label><br />
                  <div id="workform" className="workForm col-md-11" key={work.id}>
                    <label for="title">Titlu:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      placeholder="Title"
                      onChange={e => {
                        this.state.works[work.id - 1].title = e.target.value
                        this.setState({ works: this.state.works })
                      }}
                    />
                    <label for="text">Descriere:</label>

                    <textarea
                      type="text"
                      id="text"
                      name="text"
                      className="form-control col-md-10"
                      placeholder="Text"
                      onChange={e => {
                        this.state.works[work.id - 1].text = e.target.value
                        this.setState({ works: this.state.works })
                      }
                      }
                    />
                    <label for="start">Inceput:</label>

                    <input
                      type="text"
                      id="start"
                      name="start"
                      className="form-control col-md-10"
                      placeholder="Start"
                      onChange={e => {
                        this.state.works[work.id - 1].start = e.target.value
                        this.setState({ works: this.state.works })
                      }}
                    />

                    <label for="end">Sfarsit:</label>

                    <input
                      type="text"
                      id="end"
                      name="end"
                      className="form-control col-md-10"
                      placeholder="End"
                      onChange={e => {
                        this.state.works[work.id - 1].end = e.target.value
                        this.setState({ works: this.state.works })
                      }}
                    />
                    {work.id === this.state.works.length ?
                      <div
                        style={{ marginTop: "10px" }}
                      >
                        {this.state.works.length > 1 ?
                          <button
                            type="button"
                            onClick={this.handleDel}
                            className="btn btn-danger "
                            style={{ width: 50, height: 50 }}
                          >
                            -
                          </button>
                          : null}
                        <button
                          type="button"
                          onClick={this.handleAdd}
                          className="btn btn-success "
                          style={{ width: 50, height: 50 }}
                        >
                          +
                           </button>
                      </div> : null}
                  </div>
                </>);
            })}


            <label for="author">Author:</label>
            <input
              id="author"
              type="text"
              name="author"
              className="form-control"
              placeholder="Author"
              onChange={e => this.setState({ author: e.target.value })}
            />


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
