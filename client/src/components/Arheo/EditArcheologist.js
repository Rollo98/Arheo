import React, { Component } from "react";
import Axios from "axios";
import { BE_Host } from "../../config";
import { connect } from "react-redux";
import queryString from "query-string";
import Dropzone from "react-dropzone";

class EditArcheologist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fn: [],
      uid: "",
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
      fileObj: {},
      imageURL: ""

    };
  }

  async componentWillMount() {
    console.log(this.props.location.search);
    const values = queryString.parse(this.props.location.search);

    await Axios.get(
      `http://${BE_Host}/archeologist/get/?prenume=${
      values.prenume
      }&numeDeFamilie=${values.numeDeFamilie}`
    ).then(Response => {
      const arheo = Response.data.archeologists[0];
      const institutii = arheo.Institutii.reduce((prev, current) => { prev.push({ id: arheo.Institutii.indexOf(current) + 1, ...current }); return prev }, [])
      const specializarii = arheo.Specializarii.reduce((prev, current) => { prev.push({ id: arheo.Specializarii.indexOf(current) + 1, ...current }); return prev }, [])
      const studii = arheo.Studii.reduce((prev, current) => { prev.push({ id: arheo.Studii.indexOf(current) + 1, ...current }); return prev }, [])
      const santier = arheo.Santier.reduce((prev, current) => { prev.push({ id: arheo.Santier.indexOf(current) + 1, ...current }); return prev }, [])
      const domeniu = arheo.Domeniu.reduce((prev, current) => { prev.push({ id: arheo.Domeniu.indexOf(current) + 1, ...current }); return prev }, [])
      const doctorat = arheo.Doctorat.reduce((prev, current) => { prev.push({ id: arheo.Doctorat.indexOf(current) + 1, ...current }); return prev }, [])


      this.setState({
        uid: arheo.uid,
        prenume: arheo.prenume,
        numeDeFamilie: arheo.numeDeFamilie,
        birthDay: arheo.birthDay,
        deathDay: arheo.deathDay,
        Institutii: institutii,
        Specializarii: specializarii,
        Studii: studii,
        Lucrari: arheo.Lucrari,
        Santier: santier,
        Domeniu: domeniu,
        Observatii: arheo.Observatii,
        Doctorat: doctorat,
        autor: arheo.autor
      });
      if (arheo.photo !== "")
        this.setState({
          imageURL: `http://localhost:5000${arheo.photo}`
        })
    });
  }
  async sendChanges() {
    let formData = new FormData();
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
    formData.append("uid", this.state.uid)
    // Need to create another way to send photos to mongo
    formData.append("img", this.state.fileObj);

    // logging formData

    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    console.log("muiecupula b4req")
    const response = await Axios.post(
      `http://${BE_Host}/archeologist/update`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    console.log("muiecupula ", response)
    if (!response.error) {
      this.props.history.push("/");
    }
    URL.revokeObjectURL(this.state.fn);
  }
  acceptedFile(file) {
    this.setState({ fn: file });
    this.setState({ fileObj: file[0] });
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
      </div>
    ) : null;
  };
  render() {
    console.log("mortimatii", this.state.prenume);
    return (
      <div>
        {this.props.role.includes("writer") ||
          this.props.role.includes("admin") ? (
            //work place here
            <form onSubmit={this.sendChanges}>
              <br />
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
                    <aside>{this.previewImage(this.state.imageURL)}</aside>
                    <br />
                  </>
                )}
              </Dropzone>

              <div className="form-row">
                <div className="col">
                  <label htmlFor="prenume">Prenume:</label>
                  <input
                    id="prenume"
                    type="text"
                    name="prenume"
                    className="form-control"
                    value={this.state.prenume}
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
                    value={this.state.numeDeFamilie}
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
                    value={this.state.birthDay.day}
                    onChange={e => {
                      this.state.birthDay.day = e.target.value;
                      this.setState({ birthDay: this.state.birthDay });
                    }}
                  />
                  <input
                    className="dateInput m-1 text-center form-control"
                    placeholder="luna"
                    value={this.state.birthDay.month}
                    onChange={e => {
                      this.state.birthDay.month = e.target.value;
                      this.setState({ birthDay: this.state.birthDay });
                    }}
                  />
                  <input
                    className="dateInput m-1 text-center form-control"
                    placeholder="an"
                    value={this.state.birthDay.year}
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
                        value={this.state.deathDay.day}
                        onChange={e => {
                          this.state.deathDay.day = e.target.value;
                          this.setState({ deathDay: this.state.deathDay });
                        }}
                      />
                      <input
                        className="dateInput m-1 text-center form-control"
                        placeholder="luna"
                        value={this.state.deathDay.month}
                        onChange={e => {
                          this.state.deathDay.month = e.target.value;
                          this.setState({ deathDay: this.state.deathDay });
                        }}
                      />
                      <input
                        className="dateInput m-1 text-center form-control"
                        placeholder="an"
                        value={this.state.deathDay.year}
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
                        value={this.state.Institutii[inst.id - 1].text}
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
                        value={this.state.Institutii[inst.id - 1].start}
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
                        value={this.state.Institutii[inst.id - 1].end}
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
                        value={this.state.Specializarii[spec.id - 1].text}
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
                        value={this.state.Specializarii[spec.id - 1].start}
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
                        value={this.state.Specializarii[spec.id - 1].end}
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
                        value={this.state.Studii[univ.id - 1].text}
                        onChange={e => {
                          this.state.Studii[univ.id - 1].text = e.target.value;
                          this.setState({ Studii: this.state.Studii });
                        }}
                      />
                      <label htmlFor="start">Inceput:</label>
                      <input
                        className="text-center m-1"
                        placeholder="zi/luna/an"
                        value={this.state.Studii[univ.id - 1].start}
                        onChange={e => {
                          this.state.Studii[univ.id - 1].start = e.target.value;
                          this.setState({ Studii: this.state.Studii });
                        }}
                      />
                      <label htmlFor="end">Sfarsit:</label>
                      <input
                        placeholder="zi/luna/an"
                        className="text-center m-1"
                        value={this.state.Studii[univ.id - 1].end}
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
                        value={this.state.Studii[univ.id - 1].licenta_text}
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
                        value={this.state.Studii[univ.id - 1].licenta_start}
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
                        value={this.state.Studii[univ.id - 1].licenta_end}
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
                        value={this.state.Studii[univ.id - 1].master_text}
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
                        value={this.state.Studii[univ.id - 1].master_start}
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
                        value={this.state.Studii[univ.id - 1].master_end}
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
                        value={this.state.Doctorat[doc.id - 1].text}
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
                        value={this.state.Doctorat[doc.id - 1].title}
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
                        value={this.state.Doctorat[doc.id - 1].coord}
                        onChange={e => {
                          this.state.Doctorat[doc.id - 1].coord = e.target.value;
                          this.setState({ Doctorat: this.state.Doctorat });
                        }}
                      />
                      <label htmlFor="start">An sustinere:</label>
                      <input
                        className="text-center m-1"
                        placeholder="zi/luna/an"
                        value={this.state.Doctorat[doc.id - 1].start}
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
                        value={this.state.Santier[sant.id - 1].text}
                        onChange={e => {
                          this.state.Santier[sant.id - 1].text = e.target.value;
                          this.setState({ Santier: this.state.Santier });
                        }}
                      />
                      <label htmlFor="start">Inceput:</label>
                      <input
                        className="text-center m-1"
                        placeholder="zi/luna/an"
                        value={this.state.Santier[sant.id - 1].start}
                        onChange={e => {
                          this.state.Santier[sant.id - 1].start = e.target.value;
                          this.setState({ Santier: this.state.Santier });
                        }}
                      />
                      <label htmlFor="end">Sfarsit:</label>
                      <input
                        placeholder="zi/luna/an"
                        className="text-center m-1"
                        value={this.state.Santier[sant.id - 1].end}
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
                        value={this.state.Domeniu[dom.id - 1].text}
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
                    value={this.state.Lucrari}
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
                    value={this.state.Observatii}
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
                    value={this.state.Bibliografie}
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
                    value={this.state.autor}

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


              <div
                className="btn mt-2 saveButton btn-primary"
                onClick={() => {
                  this.sendChanges();
                }}
              >
                Salveaza
            </div>
            </form>
          ) : (
            //ends here
            this.props.history.push("/")
          )}
      </div>
    );
  }
}
function MapStateToProps(state) {
  return {
    role: state.auth.role
  };
}

export default connect(MapStateToProps)(EditArcheologist);
