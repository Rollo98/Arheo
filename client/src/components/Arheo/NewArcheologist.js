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
      Institutii: [{ id: 1, text: "", start: "", end: "" }],
      Specializarii: [{ id: 1, text: "", start: "", end: "" }],
      Studii: [{ id: 1, text: "", start: "", end: "" }],
      Lucrari: "",
      Santier: [{ id: 1, text: "", start: "", end: "" }],
      Domeniu: [{ id: 1, text: "" }],
      Observatii: "",
      autor: "",
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


  async sendChanges() {
    let formData = new FormData();
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("birthDay", JSON.stringify(this.state.birthDay));
    if (this.state.isDead)
      formData.append("deathDay", JSON.stringify(this.state.deathDay));

    formData.append(
      "Institutii",
      JSON.stringify(
        this.state.Institutii.reduce((acc, current) => {
          acc.push({ start: current.start, end: current.end, text: current.text });
          return acc;
        }, [])
      )
    );
    formData.append(
      "Specializarii",
      JSON.stringify(
        this.state.Specializarii.reduce((acc, current) => {
          acc.push({ start: current.start, end: current.end, text: current.text });
          return acc;
        }, [])
      )
    );
    formData.append(
      "Studii",
      JSON.stringify(
        this.state.Studii.reduce((acc, current) => {
          acc.push({ start: current.start, end: current.end, text: current.text });
          return acc;
        }, [])
      )
    );
    formData.append(
      "Santier",
      JSON.stringify(
        this.state.Santier.reduce((acc, current) => {
          acc.push({ start: current.start, end: current.end, text: current.text });
          return acc;
        }, [])
      )
    );
    formData.append(
      "Domeniu",
      JSON.stringify(
        this.state.Domeniu.reduce((acc, current) => {
          acc.push({ start: current.start, end: current.end, text: current.text });
          return acc;
        }, [])
      )
    );
    formData.append("Lucrari", JSON.stringify(this.state.Lucrari));
    formData.append("Observatii", JSON.stringify(this.state.Observatii));
    formData.append("Autor", JSON.stringify(this.state.Autor));
    //logging formData
    // var formKeys = formData.keys();
    // var formEntries = formData.entries();

    // do {
    //   console.log(formEntries.next().value);
    // } while (!formKeys.next().done)

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
                  className="dateInput m-1 text-center form-control"
                  placeholder="zi"
                  onChange={e => {
                    this.state.birthDay.day = e.target.value;
                    this.setState({ birthDay: this.state.birthDay });
                  }}
                />
                <input
                  className="dateInput m-1 text-center form-control"
                  placeholder="luna"
                  onChange={e => {
                    this.state.birthDay.month = e.target.value;
                    this.setState({ birthDay: this.state.birthDay });
                  }}
                />
                <input
                  className="dateInput m-1 text-center form-control"
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
                      className="dateInput m-1 text-center form-control"
                      placeholder="zi"
                      onChange={e => {
                        this.state.deathDay.day = e.target.value;
                        this.setState({ deathDay: this.state.deathDay });
                      }}
                    />
                    <input
                      className="dateInput m-1 text-center form-control"
                      placeholder="luna"
                      onChange={e => {
                        this.state.deathDay.month = e.target.value;
                        this.setState({ deathDay: this.state.deathDay });
                      }}
                    />
                    <input
                      className="dateInput m-1 text-center form-control"
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
            <label htmlFor="Institutii">Institutii:</label>
            {this.state.Institutii.map(inst => {
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
                        this.state.Institutii[inst.id - 1].text =
                          e.target.value;
                        this.setState({ Institutii: this.state.Institutii });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Institutii[inst.id - 1].start =
                          e.target.value;
                        this.setState({ Institutii: this.state.Institutii });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      onChange={e => {
                        this.state.Institutii[inst.id - 1].end =
                          e.target.value;
                        this.setState({ Institutii: this.state.Institutii });
                      }}
                    />
                    {inst.id === this.state.Institutii.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.Institutii.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "Institutii")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "Institutii")}
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
            <label htmlFor="Specializarii">Specializarii:</label>
            {this.state.Specializarii.map(spec => {
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
                        this.state.Specializarii[spec.id - 1].text =
                          e.target.value;
                        this.setState({
                          Specializarii: this.state.Specializarii
                        });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Specializarii[spec.id - 1].start =
                          e.target.value;
                        this.setState({
                          Specializarii: this.state.Specializarii
                        });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      onChange={e => {
                        this.state.Specializarii[spec.id - 1].end =
                          e.target.value;
                        this.setState({
                          Specializarii: this.state.Specializarii
                        });
                      }}
                    />
                    {spec.id === this.state.Specializarii.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.Specializarii.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "Specializarii")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "Specializarii")}
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
            <label htmlFor="Studii">Studii:</label>
            {this.state.Studii.map(univ => {
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
                        this.state.Studii[univ.id - 1].text =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].start =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].end = e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    {univ.id === this.state.Studii.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.Studii.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "Studii")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "Studii")}
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
            <label htmlFor="Santier">Santier:</label>
            {this.state.Santier.map(sant => {
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
                        this.state.Santier[sant.id - 1].text = e.target.value;
                        this.setState({ Santier: this.state.Santier });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Santier[sant.id - 1].start = e.target.value;
                        this.setState({ Santier: this.state.Santier });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      onChange={e => {
                        this.state.Santier[sant.id - 1].end = e.target.value;
                        this.setState({ Santier: this.state.Santier });
                      }}
                    />
                    {sant.id === this.state.Santier.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.Santier.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "Santier")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "Santier")}
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

            <label htmlFor="Domeniu">Domeniul specializarii:</label>
            {this.state.Domeniu.map(dom => {
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
                        this.state.Domeniu[dom.id - 1].text = e.target.value;
                        this.setState({ Domeniu: this.state.Domeniu });
                      }}
                    />
                    {dom.id === this.state.Domeniu.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.Domeniu.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "Domeniu")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "Domeniu")}
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
                    this.setState({ Lucrari: e.target.value });
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
                    this.setState({ Observatii: e.target.value });
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
                    this.setState({ autor: e.target.value });
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
