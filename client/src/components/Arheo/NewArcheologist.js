import React, { useEffect, Component } from "react";
import { Field } from "redux-form";
import CustomInput from "./../CustomInput";
import CustomTextarea from "./../CustomTextarea";
import * as actions from "./../../actions";
import props from "../../pages/App";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { BE_Host } from "../../config";
import id from "short-id";

export default class NewArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fn: [],
      fns: [],
      prenume: "",
      numeDeFamilie: "",
      birthDay: { day: "", month: "", year: "" },
      deathDay: { day: "", month: "", year: "" },
      isDead: false,
      Institutii: [{ id: 1, text: "", start: "", end: "" }],
      Specializarii: [{ id: 1, text: "", start: "", end: "" }],
      Studii: [
        {
          id: 1,
          text: "",
          start: "",
          end: "",
          licenta_text: "",
          licenta_start: "",
          licenta_end: "",
          master_text: "",
          master_start: "",
          master_end: ""
        }
      ],
      Doctorat: [{ id: 1, text: "", coord: "", start: "", title: "" }],
      Lucrari: "",
      Santier: [{ id: 1, text: "", start: "", end: "" }],
      Domeniu: [{ id: 1, text: "" }],
      Observatii: "",
      autor: "",
      Bibliografie: "",
      imageURL: ""
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

  //needs to be rethinked
  async sendChanges() {
    let formData = new FormData();
    let formDataImg = new FormData();
    formData.append("prenume", this.state.prenume);
    formData.append("numeDeFamilie", this.state.numeDeFamilie);
    formData.append("birthDay", JSON.stringify(this.state.birthDay));
    if (this.state.isDead)
      formData.append("deathDay", JSON.stringify(this.state.deathDay));

    formData.append(
      "Institutii",
      JSON.stringify(
        this.state.Institutii.reduce((acc, current) => {
          acc.push({
            start: current.start,
            end: current.end,
            text: current.text
          });
          return acc;
        }, [])
      )
    );
    formData.append(
      "Doctorat",
      JSON.stringify(
        this.state.Doctorat.reduce((acc, current) => {
          acc.push({
            start: current.start,
            text: current.text,
            coord: current.coord,
            title: current.title
          });
          return acc;
        }, [])
      )
    );
    formData.append(
      "Specializarii",
      JSON.stringify(
        this.state.Specializarii.reduce((acc, current) => {
          acc.push({
            start: current.start,
            end: current.end,
            text: current.text
          });
          return acc;
        }, [])
      )
    );

    formData.append(
      "Studii",
      JSON.stringify(
        this.state.Studii.reduce((acc, current) => {
          acc.push({
            start: current.start,
            end: current.end,
            text: current.text,
            licenta_start: current.licenta_start,
            licenta_end: current.licenta_end,
            licenta_text: current.licenta_text,
            master_start: current.master_start,
            master_end: current.master_end,
            master_text: current.master_text
          });
          return acc;
        }, [])
      )
    );

    formData.append(
      "Santier",
      JSON.stringify(
        this.state.Santier.reduce((acc, current) => {
          acc.push({
            start: current.start,
            end: current.end,
            text: current.text
          });
          return acc;
        }, [])
      )
    );

    formData.append(
      "Domeniu",
      JSON.stringify(
        this.state.Domeniu.reduce((acc, current) => {
          acc.push({
            start: current.start,
            end: current.end,
            text: current.text
          });
          return acc;
        }, [])
      )
    );

    formData.append("Lucrari", JSON.stringify(this.state.Lucrari));
    formData.append("Observatii", JSON.stringify(this.state.Observatii));
    formData.append("Bibliografie", JSON.stringify(this.state.Bibliografie));
    formData.append("Autor", JSON.stringify(this.state.Autor));
    formData.append("uid", id.generate());
    // Need to create another way to send photos to mongo
    formData.append("img", this.state.fn[0]);

    // logging formData
    var formKeys = formData.keys();
    var formEntries = formData.entries();

    do {
      console.log(formEntries.next().value);
    } while (!formKeys.next().done);

    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    const response = await Axios.post(
      `http://${BE_Host}/archeologist/add`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    this.state.fns.map((val, index) => { formDataImg.append(`${index}`, val) })
    formDataImg.append("arheologist", "arheo");

    const responseImg = await Axios.post(
      `http://${BE_Host}/gallery/add`,
      formDataImg,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (!response.error && !responseImg.error) {
      this.props.history.push("/");
    }
    console.log("asdasodiajwdoi", responseImg.error);

    URL.revokeObjectURL(this.state.fn);
    URL.revokeObjectURL(this.state.fns);
  }
  acceptedFile(file) {
    this.setState({ fn: file });
    // formData.append("img", file[0]);
    // console.log(JSON.stringify(file))
  }
  acceptedFileMultiple(files) {
    let fns = this.state.fns
    files.map((val) => { fns.push(val) })
    this.setState({ fns: fns });

  }
  handleChange(field, date) {
    this.setState({
      [`${field}`]: date
    });
  }
  renderFIleName = () => {
    if (this.state.fn[0] !== undefined)
      return (
        <li className="list-group-item list-group-item-success">
          {this.state.fn[0].name}
        </li>
      );
    else return "";
  };

  previewImage = fn => {
    console.log("prev", fn);
    return fn.length !== 0 ? (
      <div className="w-100 preview text-center">
        <span
          className="del-img"
          onClick={() => this.setState({ imageURL: "" })}
        >
          &times;
        </span>
        <img className="previewImage" src={fn} />
        {console.log("image", fn)}
      </div>
    ) : null;
  };
  previewImageMultiple = fn => {
    console.log("asdasd", fn);
    return fn.length !== 0 ? (
      <div className="col-3 preview">
        <span
          className="del-img"
          onClick={() => {
            let arr = this.state.imagesURL;
            delete arr[arr.indexOf(fn)];
            this.setState({
              imagesURL: arr
            });
          }}
        >
          &times;
        </span>
        <img className="thumbnail" src={fn.url} />
        {console.log("image", fn)}
      </div>
    ) : null;
  };

  render() {
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={this.sendChanges}>
            <div className="dropzone">
              <label htmlFor="autorform">Poza profil:</label>
              <Dropzone
                id="dropzone"
                multiple={false}
                accept={"image/*"}
                onDrop={e => this.acceptedFile(e)}
                onDropAccepted={
                  e =>
                    this.setState({
                      imageURL: URL.createObjectURL(new Blob(e))
                    })
                  // this.previewImage(URL.createObjectURL(new MediaSource(e)))
                }
              >
                {({ getRootProps, getInputProps, open }) => (
                  <>
                    <section className="drag-n-drop">
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>
                          Trageti fisierele aici sau click pentru a adauga
                          fisiere
                        </p>
                      </div>
                    </section>
                    <br />
                    <aside>{this.previewImage(this.state.imageURL)}</aside>
                    <br />
                  </>
                )}
              </Dropzone>
            </div>
            <div className="form-row">
              <div className="col">
                <label htmlFor="prenume">Prenume:</label>
                <input
                  id="prenume"
                  type="text"
                  name="prenume"
                  className="form-control"
                  onChange={e => this.setState({ prenume: e.target.value })}
                />
              </div>
              <div className="col">
                <label htmlFor="numeDeFamilie">Nume Familie:</label>
                <input
                  id="numeDeFamilie"
                  type="text"
                  name="numeDeFamilie"
                  className="form-control"
                  onChange={e =>
                    this.setState({ numeDeFamilie: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
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

              <div className="col">
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
                        this.state.Institutii[inst.id - 1].end = e.target.value;
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
                        this.state.Studii[univ.id - 1].text = e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].start = e.target.value;
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
                    <br />
                    <br />
                    <label htmlFor="licenta">Licenta:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].licenta_text =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].licenta_start =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].licenta_end =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <br />
                    <br />
                    <label htmlFor="licenta">Master:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].master_text =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].master_start =
                          e.target.value;
                        this.setState({ Studii: this.state.Studii });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      onChange={e => {
                        this.state.Studii[univ.id - 1].master_end =
                          e.target.value;
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
            <label htmlFor="Institutii">Doctorat:</label>
            {this.state.Doctorat.map(doc => {
              return (
                <>
                  <br />
                  <div id="docform" className="workForm col-md-11" key={doc.id}>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.Doctorat[doc.id - 1].text = e.target.value;
                        this.setState({ Doctorat: this.state.Doctorat });
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.Doctorat[doc.id - 1].title = e.target.value;
                        this.setState({ Doctorat: this.state.Doctorat });
                      }}
                    />
                    <br />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      onChange={e => {
                        this.state.Doctorat[doc.id - 1].coord = e.target.value;
                        this.setState({ Doctorat: this.state.Doctorat });
                      }}
                    />
                    <label htmlFor="start">An sustinere:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      onChange={e => {
                        this.state.Doctorat[doc.id - 1].start = e.target.value;
                        this.setState({ Doctorat: this.state.Doctorat });
                      }}
                    />
                    {doc.id === this.state.Doctorat.length ? (
                      <div style={{ marginTop: "10px" }}>
                        {this.state.Doctorat.length > 1 ? (
                          <button
                            type="button"
                            onClick={e => this.handleDeli(e, "Doctorat")}
                            className="btn btn-danger "
                            style={{ width: 35, height: 35 }}
                          >
                            -
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={e => this.handleAddi(e, "Doctorat")}
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
            <label htmlFor="biblioform">Bibliografie:</label>
            <br />
            <>
              <div id="biblioform" className="workForm col-md-11">
                <textarea
                  type="text"
                  id="text"
                  name="text"
                  className="form-control col-md-10"
                  onChange={e => {
                    this.setState({ Bibliografie: e.target.value });
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

            <br />
            <label htmlFor="autorform">Galerie:</label>

            <Dropzone
              id="dropzone"
              multiple={true}
              accept={"image/*"}
              onDrop={e => this.acceptedFileMultiple(e)}
              onDropAccepted={
                e => {
                  console.log(e);
                  if (
                    this.state.imagesURL !== undefined &&
                    this.state.imagesURL.length >= 0
                  ) {
                    let images = this.state.imagesURL;
                    console.log(images);
                    images.push({
                      url: URL.createObjectURL(new Blob(e)),
                      id: id.generate()
                    });
                    this.setState({ imagesURL: images });
                  } else {
                    this.setState({
                      imagesURL: [
                        {
                          url: URL.createObjectURL(new Blob(e)),
                          id: id.generate()
                        }
                      ]
                    });
                  }
                }
                // this.previewImage(URL.createObjectURL(new MediaSource(e)))
              }
            >
              {({ getRootProps, getInputProps, open }) => (
                <>
                  <section className="drag-n-drop">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Trageti fisierele aici sau click pentru a adauga fisiere
                      </p>
                    </div>
                  </section>
                  <br />
                  <aside className="row">
                    {this.state.imagesURL !== undefined
                      ? this.state.imagesURL.map(n => {
                        return this.previewImageMultiple(n);
                      })
                      : null}
                  </aside>
                  <br />
                </>
              )}
            </Dropzone>
            <div
              className="btn mt-2 saveButton btn-primary"
              onClick={() => {
                this.sendChanges();
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
