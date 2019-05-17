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
      isDead: false,
      institution: [{ id: 1, text: "" }],
      specialization: [{ id: 1, text: "" }],
      university: [{ id: 1, text: "" }],
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

  handleAddi = (e, type) => {
    const iDi = this.state[type][this.state[type].length - 1].id + 1;
    this.setState(prevState => ({
      [`${type}`]: [
        ...prevState[type],
        {
          id: iDi,
          text: ""
        }
      ]
    }));
  };

  handleDel = (e, type) => {
    if (this.state[type].length > 1) {
      const value = this.state[type];
      value.pop();
      console.log(value);
      this.setState({ [`${type}`]: value });
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
    console.log(JSON.stringify(this.state.institution.reduce((acc, current) => { acc.push(current.text); return acc }, [])));
    let { formData } = this.state;
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("birthDay", this.state.birthDay.toISOString());
    if (this.state.isDead)
      formData.append("deathDay", this.state.deathDay.toISOString());

    formData.append("institution", JSON.stringify(this.state.institution.reduce((acc, current) => { acc.push(current.text); return acc }, [])));
    formData.append("specialization", JSON.stringify(this.state.specialization.reduce((acc, current) => { acc.push(current.text); return acc }, [])));
    formData.append("university", JSON.stringify(this.state.university.reduce((acc, current) => { acc.push(current.text); return acc }, [])));

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
              <label htmlFor="dropzone">Upload Picture:</label>
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
                <label htmlFor="firstName">Prenume:</label>
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
                <label htmlFor="lastName">Nume Familie:</label>
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
                <label htmlFor="birthDay">Zi Nastere:</label>
                <DatePicker
                  selected={this.state.birthDay}
                  onChange={e => {
                    this.handleChange("birthDay", e);
                  }}
                />
              </div>

              <div class="col">
                <label style={{ marginRight: "10px" }}>
                  <input
                    style={{ marginRight: '3px' }}
                    type='checkbox'
                    name={"Decedat"}
                    defaultChecked={this.state.isDead}
                    onChange={e => this.setState({ isDead: !this.state.isDead })}
                    className='form-check-input'
                  />
                  {"Decedat"}
                </label>
                {this.state.isDead ? <>
                  <label htmlFor="deathDay">Decedat la:</label>
                  <DatePicker
                    selected={this.state.deathDay}
                    onChange={e => {
                      this.handleChange("deathDay", e);
                    }}
                  />
                </> : null
                }
              </div>
            </div>
            <label htmlFor="institution">Institutie:</label>
            {this.state.institution.map(inst => {
              return (
                <>
                  <br /> <label htmlFor="instform">{`${inst.id}`}</label>
                  <br />
                  <div
                    id="instform"
                    className="workForm col-md-11"
                    key={inst.id}
                  >
                    <label htmlFor="title">Institutia:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      placeholder="Title"
                      onChange={e => {
                        this.state.institution[inst.id - 1].text = e.target.value;
                        this.setState({ institution: this.state.institution });
                      }}
                    />
                    {inst.id === this.state.institution.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.institution.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDel(e, 'institution')}
                            className="btn btn-danger "
                            style={{ width: 50, height: 50 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, 'institution')}
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


            <label htmlFor="specialization">Specializari:</label>
            {this.state.specialization.map(spec => {
              return (
                <>
                  <br /> <label htmlFor="specform">{`${spec.id}`}</label>
                  <br />
                  <div
                    id="specform"
                    className="workForm col-md-11"
                    key={spec.id}
                  >
                    <label htmlFor="title">Specializarea:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      placeholder="Title"
                      onChange={e => {
                        this.state.specialization[spec.id - 1].text = e.target.value;
                        this.setState({ specialization: this.state.specialization });
                      }}
                    />
                    {spec.id === this.state.specialization.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.specialization.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDel(e, 'specialization')}
                            className="btn btn-danger "
                            style={{ width: 50, height: 50 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, 'specialization')}
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

            <label htmlFor="university">Universitati:</label>
            {this.state.university.map(univ => {
              return (
                <>
                  <br /> <label htmlFor="univform">{`${univ.id}`}</label>
                  <br />
                  <div
                    id="univform"
                    className="workForm col-md-11"
                    key={univ.id}
                  >
                    <label htmlFor="title">Universitatea:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      placeholder="Title"
                      onChange={e => {
                        this.state.university[univ.id - 1].text = e.target.value;
                        this.setState({ university: this.state.university });
                      }}
                    />
                    {univ.id === this.state.university.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.university.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDel(e, 'university')}
                            className="btn btn-danger "
                            style={{ width: 50, height: 50 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, 'university')}
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
            <label htmlFor="workform">Lucrari:</label>
            <br />
            {this.state.works.map(work => {
              return (
                <>
                  <br /> <label htmlFor="workform">{`${work.id}`}</label>
                  <br />
                  <div
                    id="workform"
                    className="workForm col-md-11"
                    key={work.id}
                  >
                    <label htmlFor="title">Titlu:</label>
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
                    <label htmlFor="text">Descriere:</label>
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
                    <label htmlFor="start">Inceput:</label>
                    <DatePicker
                      selected={new Date(this.state.works[work.id - 1].start)}
                      onChange={e => {
                        this.state.works[work.id - 1].start = e.toISOString();
                        this.setState({ works: this.state.works });
                      }}
                    />

                    <label htmlFor="end">Sfarsit:</label>
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
