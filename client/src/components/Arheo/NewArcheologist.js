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
      fn: [],
      firstName: "",
      lastName: "",
      birthDay: { day: "", month: "", year: "" },
      deathDay: { day: "", month: "", year: "" },
      isDead: false,
      institution: [{ id: 1, text: "", start: "", end: "" }],
      specialization: [{ id: 1, text: "", start: "", end: "" }],
      university: [{ id: 1, text: "", start: "", end: "" }],
      works: "",
      santier: [{ id: 1, text: "", start: "", end: "" }],
      domeniu: [{ id: 1, text: "" }],
      obs: "",
      autor: "",
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

  handleDeli = (e, type) => {
    if (this.state[type].length > 1) {
      const value = this.state[type];
      value.pop();
      console.log(value);
      this.setState({ [`${type}`]: value });
    }
  };

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
    console.log(
      JSON.stringify(
        this.state.institution.reduce((acc, current) => {
          acc.push(current.text);
          return acc;
        }, [])
      )
    );
    let { formData } = this.state;
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("birthDay", this.state.birthDay.toISOString());
    if (this.state.isDead)
      formData.append("deathDay", this.state.deathDay.toISOString());

    formData.append(
      "institution",
      JSON.stringify(
        this.state.institution.reduce((acc, current) => {
          acc.push(current.text);
          return acc;
        }, [])
      )
    );
    formData.append(
      "specialization",
      JSON.stringify(
        this.state.specialization.reduce((acc, current) => {
          acc.push(current.text);
          return acc;
        }, [])
      )
    );
    formData.append(
      "university",
      JSON.stringify(
        this.state.university.reduce((acc, current) => {
          acc.push(current.text);
          return acc;
        }, [])
      )
    );

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
    this.setState({ fn: file });
    let { formData } = this.state;
    formData.append("img", file[0]);
    this.setState({ formData: formData });
  }
  handleChange(field, date) {
    this.setState({
      [`${field}`]: date
    });
  }
  renderFIleName = () => {
    if (this.state.fn[0] !== undefined) return this.state.fn[0].name;
    else return "";
  };
  render() {
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
                    <section className="container" />
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
                    <br />
                    <aside>
                      <h6>Files</h6>
                      <ul>{this.renderFIleName()}</ul>
                    </aside>
                    <br />
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
                  onChange={e => this.setState({ lastName: e.target.value })}
                />
              </div>
            </div>
            <div class="form-row">
              <div class="col">
                <label htmlFor="birthDay">Zi Nastere:</label>
                <input
                  placeholder="zi"
                  onChange={e => {
                    this.state.birthDay.day = e.target.value;
                    this.setState({ birthDay: this.state.birthDay });
                  }}
                />
                <input
                  placeholder="luna"
                  onChange={e => {
                    this.state.birthDay.month = e.target.value;
                    this.setState({ birthDay: this.state.birthDay });
                  }}
                />
                <input
                  placeholder="an"
                  onChange={e => {
                    this.state.birthDay.year = e.target.value;
                    this.setState({ birthDay: this.state.birthDay });
                  }}
                />
              </div>

              <div class="col">
                <label style={{ marginRight: "10px" }}>
                  <input
                    style={{ marginRight: "3px" }}
                    type="checkbox"
                    name={"Decedat"}
                    defaultChecked={this.state.isDead}
                    onChange={e =>
                      this.setState({ isDead: !this.state.isDead })
                    }
                    className="form-check-input"
                  />
                  {"Decedat"}
                </label>
                {this.state.isDead ? (
                  <>
                    <label htmlFor="deathDay">Decedat la:</label>
                    <input
                      placeholder="zi"
                      onChange={e => {
                        this.state.deathDay.day = e.target.value;
                        this.setState({ deathDay: this.state.deathDay });
                      }}
                    />
                    <input
                      placeholder="luna"
                      onChange={e => {
                        this.state.deathDay.month = e.target.value;
                        this.setState({ deathDay: this.state.deathDay });
                      }}
                    />
                    <input
                      placeholder="an"
                      onChange={e => {
                        this.state.deathDay.year = e.target.value;
                        this.setState({ deathDay: this.state.deathDay });
                      }}
                    />
                  </>
                ) : null}
              </div>
            </div>
            <label htmlFor="institution">Institutii:</label>
            {this.state.institution.map(inst => {
              return (
                <>
                  <br />
                  <div
                    id="instform"
                    className="workForm col-md-11"
                    key={inst.id}
                  >
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.institution[inst.id - 1].text =
                          e.target.value;
                        this.setState({ institution: this.state.institution });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      onChange={e => {
                        this.state.institution[inst.id - 1].start =
                          e.target.value;
                        this.setState({ institution: this.state.institution });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      onChange={e => {
                        this.state.institution[inst.id - 1].end =
                          e.target.value;
                        this.setState({ institution: this.state.institution });
                      }}
                    />
                    {inst.id === this.state.institution.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.institution.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "institution")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "institution")}
                          className="btn btn-success ml-2"
                          style={{ width: 35, height: 35 }}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
            <label htmlFor="specialization">Specializarii:</label>
            {this.state.specialization.map(spec => {
              return (
                <>
                  <br />
                  <div id="specform" className="workForm col-md-11">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.specialization[spec.id - 1].text =
                          e.target.value;
                        this.setState({
                          specialization: this.state.specialization
                        });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      onChange={e => {
                        this.state.specialization[spec.id - 1].start =
                          e.target.value;
                        this.setState({
                          specialization: this.state.specialization
                        });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      onChange={e => {
                        this.state.specialization[spec.id - 1].end =
                          e.target.value;
                        this.setState({
                          specialization: this.state.specialization
                        });
                      }}
                    />
                    {spec.id === this.state.specialization.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.specialization.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "specialization")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "specialization")}
                          className="btn btn-success ml-2"
                          style={{ width: 35, height: 35 }}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
            <label htmlFor="university">Studii:</label>
            {this.state.university.map(univ => {
              return (
                <>
                  <br />
                  <div id="univform" className="workForm col-md-11">
                    {/* <label htmlFor="title">Studiu:</label> */}
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.university[univ.id - 1].text =
                          e.target.value;
                        this.setState({ university: this.state.university });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      onChange={e => {
                        this.state.university[univ.id - 1].start =
                          e.target.value;
                        this.setState({ university: this.state.university });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      onChange={e => {
                        this.state.university[univ.id - 1].end = e.target.value;
                        this.setState({ university: this.state.university });
                      }}
                    />
                    {univ.id === this.state.university.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.university.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "university")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "university")}
                          className="btn btn-success ml-2"
                          style={{ width: 35, height: 35 }}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
            <label htmlFor="santier">Santier:</label>
            {this.state.santier.map(sant => {
              return (
                <>
                  <br />
                  <div id="santform" className="workForm col-md-11">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.santier[sant.id - 1].text = e.target.value;
                        this.setState({ santier: this.state.santier });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      onChange={e => {
                        this.state.santier[sant.id - 1].start = e.target.value;
                        this.setState({ santier: this.state.santier });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      onChange={e => {
                        this.state.santier[sant.id - 1].end = e.target.value;
                        this.setState({ santier: this.state.santier });
                      }}
                    />
                    {sant.id === this.state.santier.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.santier.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "santier")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "santier")}
                          className="btn btn-success ml-2"
                          style={{ width: 35, height: 35 }}
                        >
                          +
                        </button>
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}

            <label htmlFor="domeniu">Domeniul specializarii:</label>
            {this.state.domeniu.map(dom => {
              return (
                <>
                  <br />
                  <div id="domform" className="workForm col-md-11">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.domeniu[dom.id - 1].text = e.target.value;
                        this.setState({ domeniu: this.state.domeniu });
                      }}
                    />
                    {dom.id === this.state.domeniu.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.domeniu.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "domeniu")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "domeniu")}
                          className="btn btn-success ml-2"
                          style={{ width: 35, height: 35 }}
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
            <>
              <div id="workform" className="workForm col-md-11">
                <textarea
                  type="text"
                  id="text"
                  name="text"
                  className="form-control col-md-10"
                  onChange={e => {
                    this.setState({ works: this.state.works });
                  }}
                />
              </div>
            </>

            <label htmlFor="obsform">Observatii:</label>
            <br />
            <>
              <div id="obsform" className="workForm col-md-11">
                <textarea
                  type="text"
                  id="text"
                  name="text"
                  className="form-control col-md-10"
                  onChange={e => {
                    this.setState({ obs: this.state.obs });
                  }}
                />
              </div>
            </>

            <label htmlFor="autorform">Autor:</label>
            <br />
            <>
              <div id="autorform" className="workForm col-md-11">
                <input
                  type="text"
                  id="text"
                  name="text"
                  className="form-control col-md-10"
                  onChange={e => {
                    this.setState({ autor: this.state.autor });
                  }}
                />
              </div>
            </>

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
