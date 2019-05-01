import React, { Component } from "react";
import { Field } from "redux-form";
import CustomInput from "./../CustomInput";
import CustomTextarea from "./../CustomTextarea";
import * as actions from "./../../actions";
import props from "../../pages/App";
import Dropzone from "react-dropzone";
import Axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class NewArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      birthDay: new Date(),
      deathDay: new Date(),
      institution: "",
      specialization: "",
      university: "",
      works: [
        {
          id: 1,
          start: new Date().toISOString(),
          end: new Date().toISOString(),
          title: "",
          text: ""
        }
      ],
      formData: new FormData()
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
      const works = this.state.works;
      works.pop();
      console.log(works);
      this.setState({ works });
    }
  };
  handleAdd = e => {
    const iD = this.state.works[this.state.works.length - 1].id + 1;
    this.setState(prevState => ({
      works: [
        ...prevState.works,
        {
          id: iD,
          title: "",
          text: "",
          start: new Date().toISOString(),
          end: new Date().toISOString()
        }
      ]
    }));
  };

  async sendChanges() {
    const works = this.state.works.reduce((acc, val) => {
      const currentVal = {
        start: val.start,
        end: val.end,
        title: val.title,
        text: val.text
      };
      acc.push(currentVal);
      return acc;
    }, []);
    console.log(JSON.stringify([this.state.institution]));
    let { formData } = this.state;
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("birthDay", this.state.birthDay.toISOString());
    formData.append("deathDay", this.state.deathDay.toISOString());
    formData.append("institution", JSON.stringify([this.state.institution]));
    formData.append(
      "specialization",
      JSON.stringify([this.state.specialization])
    );
    formData.append("university", JSON.stringify([this.state.university]));
    formData.append("works", JSON.stringify(works));
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    const response = await Axios.post(
      `http://localhost:5000/archeologist/add`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (!response.error) {
      this.props.history.push("/");
    }
  }
  acceptedFile(file) {
    let { formData } = this.state;
    formData.append("img", file[0]);
    this.setState({ formData: formData });
  }
  handleChange(field, date) {
    this.setState({
      [`${field}`]: date
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={this.sendChanges}>
            <div className="dropzone">
              <label for="dropzone">Upload Picture:</label>
              <Dropzone
                id="dropzone"
                multiple={false}
                accept={"image/*"}
                onDrop={e => this.acceptedFile(e)}
                noClick
              >
                {({ getRootProps, getInputProps, open }) => (
                  <>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => open()}
                      >
                        Open File Dialog
                      </button>
                    </div>
                  </>
                )}
              </Dropzone>
            </div>

            <div class="form-row">
              <div class="col">
                <label for="firstName">FirstName:</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First name"
                  onChange={e => this.setState({ firstName: e.target.value })}
                />
              </div>
              <div class="col">
                <label for="lastName">LastName:</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last name"
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
              </div>
            </div>

            <div class="form-row">
              <div class="col">
                <label for="birthDay">BirthDay:</label>
                <DatePicker
                  selected={this.state.birthDay}
                  onChange={e => {
                    this.handleChange("birthDay", e);
                  }}
                />
              </div>
              <div class="col">
                <label for="deathDay">DeathDay:</label>
                <DatePicker
                  selected={this.state.deathDay}
                  onChange={e => {
                    this.handleChange("deathDay", e);
                  }}
                />
              </div>
            </div>
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
            <label for="workform">Work:</label>
            <br />
            {this.state.works.map(work => {
              return (
                <>
                  <br /> <label for="workform">{`${work.id}`}</label>
                  <br />
                  <div
                    id="workform"
                    className="workForm col-md-11"
                    key={work.id}
                  >
                    <label for="title">Titlu:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      placeholder="Title"
                      onChange={e => {
                        this.state.works[work.id - 1].title = e.target.value;
                        this.setState({ works: this.state.works });
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
                        this.state.works[work.id - 1].text = e.target.value;
                        this.setState({ works: this.state.works });
                      }}
                    />
                    <label for="start">Inceput:</label>
                    <DatePicker
                      selected={new Date(this.state.works[work.id - 1].start)}
                      onChange={e => {
                        this.state.works[work.id - 1].start = e.toISOString();
                        this.setState({ works: this.state.works });
                      }}
                    />

                    <label for="end">Sfarsit:</label>
                    <DatePicker
                      selected={new Date(this.state.works[work.id - 1].end)}
                      onChange={e => {
                        this.state.works[work.id - 1].end = e.toISOString();
                        this.setState({ works: this.state.works });
                      }}
                    />
                    {work.id === this.state.works.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.works.length > 1 ? (
                          <button
                            type="button"
                            onClick={this.handleDel}
                            className="btn btn-danger "
                            style={{ width: 50, height: 50 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={this.handleAdd}
                          className="btn btn-success ml-2"
                          style={{ width: 50, height: 50 }}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
            {this.props.errorMessage ? (
              <div className="alert  alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}
            {/* <button 
            // type="submit" 
            className="btn mt-2 btn-primary"
            onClick={this.sendChanges}
            >
              Save
            </button> */}
            <div
              className="btn mt-2 btn-primary"
              onClick={() => {
                this.sendChanges();
              }}
            >
              Save
            </div>
          </form>
        </div>
      </div>
    );
  }
}
