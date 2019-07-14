import React, { Component } from "react";
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
      texts: {},
      prenume: "",
      numeDeFamilie: "",
      alteNume: "",
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
          tip: ""
        }
      ],
      Doctorat: [{ id: 1, text: "", coord: "", start: "", title: "" }],
      Lucrari: "",
      Santier: [{ id: 1, text: "", start: "", end: "" }],
      Domeniu: [{ id: 1, text: "" }],
      Observatii: "",
      autor: "",
      Bibliografie: "",
      imageURL: "",
      imagesURL: []
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
    formData.append("alteNume", this.state.alteNume);
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
            tip: current.tip
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
    this.state.fns.forEach((val, index) => {
      formDataImg.append(`${index}`, val);
    });

    formDataImg.append("text", this.state.texts);
    formDataImg.append("arheologist", response.data._id);

    const responseImg = await Axios.post(
      `http://${BE_Host}/gallery/add`,
      formDataImg,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (!response.error && !responseImg.error) {
      this.props.history.push("/");
    }

    URL.revokeObjectURL(this.state.fn);
    URL.revokeObjectURL(this.state.fns);
  }
  acceptedFile(file) {
    this.setState({ fn: file });
    // formData.append("img", file[0]);
    // console.log(JSON.stringify(file))
  }
  acceptedFileMultiple(files) {
    let fns = this.state.fns;
    files.forEach(val => {
      fns.push(val);
    });
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
    return fn.length !== 0 ? (
      <div className="w-100 preview text-center">
        <span
          className="del-img"
          onClick={() => this.setState({ imageURL: "" })}
        >
          &times;
        </span>
        <img className="previewImage" src={fn} alt="" />
      </div>
    ) : null;
  };

  previewImageMultiple = fn => {
    return fn.length !== 0 ? (
      <div key={fn.id} className="col-3 preview">
        <span
          className="del-img"
          onClick={() => {
            let arr = [...this.state.imagesURL];
            let fns = [...this.state.fns];
            delete arr[arr.indexOf(fn)];
            delete fns[
              fns.indexOf(fns.filter(photo => photo.name === fn.name))
            ];
            this.setState({
              imagesURL: arr,
              fns
            });
          }}
        >
          &times;
        </span>
        <img className="thumbnail" src={fn.url} alt="" />
        <input
          type="text"
          onChange={e => {
            console.log("fn", fn);
            console.log("name", fn.name);
            const text = this.state.texts;
            text[fn.name] = e.target.value;
            this.setState({ texts: text });
          }}
        />
      </div>
    ) : null;
  };

  render() {
    console.log(this.state);
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
              <div className="col">
                <label htmlFor="alteNume">Alte nume:</label>
                <input
                  id="alteNume"
                  type="text"
                  name="alteNume"
                  className="form-control"
                  onChange={e => this.setState({ alteNume: e.target.value })}
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
                    const birthDayObj = { ...this.state.birthDay };
                    birthDayObj.day = e.target.value;
                    this.setState({ birthDay: birthDayObj });
                  }}
                />
                <input
                  className="dateInput m-1 text-center form-control"
                  placeholder="luna"
                  value={this.state.birthDay.month}
                  onChange={e => {
                    const birthDayObj = { ...this.state.birthDay };
                    birthDayObj.month = e.target.value;
                    this.setState({ birthDay: birthDayObj });
                  }}
                />
                <input
                  className="dateInput m-1 text-center form-control"
                  placeholder="an"
                  value={this.state.birthDay.year}
                  onChange={e => {
                    const birthDayObj = { ...this.state.birthDay };
                    birthDayObj.year = e.target.value;
                    this.setState({ birthDay: birthDayObj });
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
                        const deathDayObj = { ...this.state.deathDay };
                        deathDayObj.day = e.target.value;
                        this.setState({ deathDay: deathDayObj });
                      }}
                    />
                    <input
                      className="dateInput m-1 text-center form-control"
                      placeholder="luna"
                      value={this.state.deathDay.month}
                      onChange={e => {
                        const deathDayObj = { ...this.state.deathDay };
                        deathDayObj.month = e.target.value;
                        this.setState({ deathDay: deathDayObj });
                      }}
                    />
                    <input
                      className="dateInput m-1 text-center form-control"
                      placeholder="an"
                      value={this.state.deathDay.year}
                      onChange={e => {
                        const deathDayObj = { ...this.state.deathDay };
                        deathDayObj.year = e.target.value;
                        this.setState({ deathDay: deathDayObj });
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
                        const InstitutiiObj = [...this.state.Institutii];
                        InstitutiiObj[inst.id - 1].text = e.target.value;
                        this.setState({ Institutii: InstitutiiObj });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      value={this.state.Institutii[inst.id - 1].start}
                      onChange={e => {
                        const InstitutiiObj = [...this.state.Institutii];
                        InstitutiiObj[inst.id - 1].start = e.target.value;
                        this.setState({ Institutii: InstitutiiObj });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      value={this.state.Institutii[inst.id - 1].end}
                      onChange={e => {
                        const InstitutiiObj = [...this.state.Institutii];
                        InstitutiiObj[inst.id - 1].end = e.target.value;
                        this.setState({ Institutii: InstitutiiObj });
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
                        const SpecializariiObj = [...this.state.Specializarii];
                        SpecializariiObj[spec.id - 1].text = e.target.value;
                        this.setState({ Specializarii: SpecializariiObj });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      value={this.state.Specializarii[spec.id - 1].start}
                      onChange={e => {
                        const SpecializariiObj = [...this.state.Specializarii];
                        SpecializariiObj[spec.id - 1].start = e.target.value;
                        this.setState({ Specializarii: SpecializariiObj });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      value={this.state.Specializarii[spec.id - 1].end}
                      onChange={e => {
                        const SpecializariiObj = [...this.state.Specializarii];
                        SpecializariiObj[spec.id - 1].end = e.target.value;
                        this.setState({ Specializarii: SpecializariiObj });
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
                    <label htmlFor="licenta">Studiu:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      value={this.state.Studii[univ.id - 1].text}
                      onChange={e => {
                        const StudiiObj = [...this.state.Studii];
                        StudiiObj[univ.id - 1].text = e.target.value;
                        this.setState({ Studii: StudiiObj });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      value={this.state.Studii[univ.id - 1].start}
                      onChange={e => {
                        const StudiiObj = [...this.state.Studii];
                        StudiiObj[univ.id - 1].start = e.target.value;
                        this.setState({ Studii: StudiiObj });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      value={this.state.Studii[univ.id - 1].end}
                      onChange={e => {
                        const StudiiObj = [...this.state.Studii];
                        StudiiObj[univ.id - 1].end = e.target.value;
                        this.setState({ Studii: StudiiObj });
                      }}
                    />
                    <label htmlFor="tip">Tip:</label>
                    <input
                      placeholder="Licenta/Master"
                      className="text-center m-1"
                      value={this.state.Studii[univ.id - 1].tip}
                      onChange={e => {
                        const StudiiObj = [...this.state.Studii];
                        StudiiObj[univ.id - 1].tip = e.target.value;
                        this.setState({ Studii: StudiiObj });
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
                    <label htmlFor="title">Universitate:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      value={this.state.Doctorat[doc.id - 1].text}
                      onChange={e => {
                        const DoctoratObj = [...this.state.Doctorat];
                        DoctoratObj[doc.id - 1].text = e.target.value;
                        this.setState({ Doctorat: DoctoratObj });
                      }}
                    />
                    <br />
                    <label htmlFor="title">Titlu lucrare:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      value={this.state.Doctorat[doc.id - 1].title}
                      onChange={e => {
                        const DoctoratObj = [...this.state.Doctorat];
                        DoctoratObj[doc.id - 1].title = e.target.value;
                        this.setState({ Doctorat: DoctoratObj });
                      }}
                    />
                    <br />
                    <label htmlFor="title">Coordonator doctorat:</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control col-md-10"
                      value={this.state.Doctorat[doc.id - 1].coord}
                      onChange={e => {
                        const DoctoratObj = [...this.state.Doctorat];
                        DoctoratObj[doc.id - 1].coord = e.target.value;
                        this.setState({ Doctorat: DoctoratObj });
                      }}
                    />
                    <label htmlFor="start">An sustinere:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      value={this.state.Doctorat[doc.id - 1].start}
                      onChange={e => {
                        const DoctoratObj = [...this.state.Doctorat];
                        DoctoratObj[doc.id - 1].start = e.target.value;
                        this.setState({ Doctorat: DoctoratObj });
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
                        const SantierObj = [...this.state.Santier];
                        SantierObj[sant.id - 1].text = e.target.value;
                        this.setState({ Santier: SantierObj });
                      }}
                    />
                    <label htmlFor="start">Inceput:</label>
                    <input
                      className="text-center m-1"
                      placeholder="zi/luna/an"
                      value={this.state.Santier[sant.id - 1].start}
                      onChange={e => {
                        const SantierObj = [...this.state.Santier];
                        SantierObj[sant.id - 1].start = e.target.value;
                        this.setState({ Santier: SantierObj });
                      }}
                    />
                    <label htmlFor="end">Sfarsit:</label>
                    <input
                      placeholder="zi/luna/an"
                      className="text-center m-1"
                      value={this.state.Santier[sant.id - 1].end}
                      onChange={e => {
                        const SantierObj = [...this.state.Santier];
                        SantierObj[sant.id - 1].end = e.target.value;
                        this.setState({ Santier: SantierObj });
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
                        const DomeniuObj = [...this.state.Domeniu];
                        DomeniuObj[dom.id - 1].text = e.target.value;
                        this.setState({ Domeniu: DomeniuObj });
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
              onDropAccepted={e => {
                const arr = [...this.state.imagesURL];
                // console.log(images);
                e.map(n => {
                  arr.push({
                    url: URL.createObjectURL(new Blob([n])),
                    id: id.generate(),
                    name: n.name
                  });
                  console.log("asda", this.state);
                  this.setState({ imagesURL: arr });
                });
              }}
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
