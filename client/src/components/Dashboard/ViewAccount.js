import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Checkbox from "../checkbox";
import { BE_Host } from '../../config'

class ViewAccount extends Component {
  constructor() {
    super();
    this.state = {
      prenume: "",
      numeDeFamilie: "",
      email: "",
      password: "",
      role: [],
      checkboxesOptions: {
        user: false,
        admin: false,
        writer: false
      },
      roleDefined: ["admin", "writer"],
      show: true,
      edit: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }
  componentWillReceiveProps() {
    this.setState({ governorOptions: this.props.governorOptions });
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }
  async componentWillMount() {
    if (this.props.userName === null || this.props.userName === undefined) {
      const userName = localStorage.getItem("uNema");
      this.setState({ userName });
      const jwtToken = localStorage.getItem("zeBilet");
      Axios.defaults.headers.common["Authorization"] = jwtToken;
      let Response = await Axios.get(`http://${BE_Host}/${userName}`);
      if (Response) {
        const roles = Object.values(Response.data.foundUser[0].role);
        let checkboxesOptions = this.state.checkboxesOptions;
        if (roles.length > 0)
          roles.map(n => {
            checkboxesOptions[n] = true;
          });
        this.setState({ checkboxesOptions });
        this.setState({
          prenume: Response.data.foundUser[0].prenume,
          numeDeFamilie: Response.data.foundUser[0].numeDeFamilie,
          email: Response.data.foundUser[0].email,
          role: Response.data.foundUser[0].role,
          gotData: true
        });
      }
    } else {
      this.setState({ userName: this.props.userName });
      const jwtToken = localStorage.getItem("zeBilet");
      Axios.defaults.headers.common["Authorization"] = jwtToken;
      let Response = await Axios.get(
        `http://${BE_Host}/${this.props.userName}`
      );
      if (Response) {
        const roles = Object.values(Response.data.foundUser[0].role);
        let checkboxesOptions = this.state.checkboxesOptions;
        if (roles.length > 0)
          roles.map(n => {
            checkboxesOptions[n] = true;
          });
        this.setState({ checkboxesOptions });
        this.setState({
          prenume: Response.data.foundUser[0].prenume,
          numeDeFamilie: Response.data.foundUser[0].numeDeFamilie,
          email: Response.data.foundUser[0].email,
          gotData: true
        });
      }
    }
  }
  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;
    this.setState(prevState => ({
      checkboxesOptions: {
        ...prevState.checkboxesOptions,
        [name]: !prevState.checkboxesOptions[name]
      }
    }));
  };
  roleRender(edit) {
    const roles = Object.values(this.state.roleDefined);
    let x = "";
    if (roles.length > 0) {
      x = roles.map((n, key) => (
        <>
          {!edit ? (
            <>
              {this.state.checkboxesOptions[n] ? (
                <div
                  key={key}
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                >
                  <Checkbox
                    label={n}
                    isSelected={this.state.checkboxesOptions[n]}
                    key={n}
                  />
                </div>
              ) : null}
            </>
          ) : (
              <>
                <div key={key} style={{ marginLeft: "10px", marginTop: "10px" }}>
                  <Checkbox
                    label={n}
                    isSelected={this.state.checkboxesOptions[n]}
                    onCheckboxChange={this.handleCheckboxChange}
                    key={n}
                  />
                </div>
              </>
            )}
        </>
      ));
    }
    return x;
  }

  async sendChanges() {
    let checkboxesOptions = this.state.checkboxesOptions;
    let data = {};
    data.prenume = this.state.prenume;
    data.numeDeFamilie = this.state.numeDeFamilie;
    data.email = this.state.email;
    data.role = ["user"];
    this.state.roleDefined.map(n => {
      if (checkboxesOptions[n] === true) {
        data.role.push(n);
      }
    });
    data.password = this.state.password;
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    let Response;
    if (this.props.userName === null || this.props.userName === undefined) {
      Response = await Axios.post(`http://${BE_Host}/edit`, data);
    } else {
      Response = await Axios.post(
        `http://${BE_Host}/${this.props.userName}/edit`,
        data
      );
    }
    if (Response.status === 200) {
      this.handleClose();
    }
  }

  async sendDeleteAcc() {
    const jwtToken = localStorage.getItem("zeBilet");
    Axios.defaults.headers.common["Authorization"] = jwtToken;
    let Response;
    if (this.props.userName === null || this.props.userName === undefined) {
      Response = await Axios.delete(`http://${BE_Host}/`);
    } else {
      Response = await Axios.delete(
        `http://${BE_Host}/${this.props.userName}`
      );
    }
    if (Response.status === 200) {
      this.handleClose();
    }
  }

  resetState() {
    this.setState({
      prenume: "",
      numeDeFamilie: "",
      email: "",
      password: "",
      role: [],
      edit: false
    });
  }

  render() {
    return !this.state.show ? (
      <>
        {this.props.userName ? (
          <Redirect to="/dashboard" />
        ) : (
            <Redirect to="/" />
          )}
      </>
    ) : (
        <>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton={true} onHide={this.handleClose}>
              <Modal.Title>{this.state.userName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.edit ? (
                <>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <span
                        className="spanCustom input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        <b>Nume</b>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      value={this.state.numeDeFamilie}
                      onChange={e => {
                        this.setState({ numeDeFamilie: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <span
                        className="spanCustom input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        <b>Prenume</b>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      value={this.state.prenume}
                      onChange={e => {
                        this.setState({ prenume: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <span
                        className="spanCustom input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        <b>Email</b>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-group mt-2">
                    <div className="input-group-prepend">
                      <span
                        className="spanCustom input-group-text"
                        id="inputGroup-sizing-sm"
                      >
                        <b>Parola</b>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      value={this.state.password}
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                    />
                  </div>
                  <div className="input-group mt-2">
                    <span
                      className="input-group-text modalSpan"
                      id="inputGroup-sizing-sm"
                    >
                      <b>Rol:</b>
                    </span>
                    {this.props.userName
                      ? this.roleRender(true)
                      : this.roleRender(false)}
                  </div>
                </>
              ) : (
                  <>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <span
                          className="spanCustom input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          <b>Nume</b>
                        </span>
                      </div>
                      <div className="form-control">{this.state.numeDeFamilie}</div>
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <span
                          className="spanCustom input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          <b>Prenume</b>
                        </span>
                      </div>
                      <div className="form-control">{this.state.prenume}</div>
                    </div>
                    <div className="input-group mt-2">
                      <div className="input-group-prepend">
                        <span
                          className="spanCustom input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          <b>Email</b>
                        </span>
                      </div>
                      <div className="form-control">{this.state.email}</div>
                    </div>

                    <div className="input-group mt-2">
                      <span
                        className="input-group-text modalSpan"
                        id="inputGroup-sizing-sm"
                      >
                        <b>Rol</b>
                      </span>
                      {this.roleRender(false)}
                    </div>
                  </>
                )}
            </Modal.Body>
            <Modal.Footer>
              <button
                variant="primary"
                type="button"
                className="btn btn-danger "
                style={{ marginRight: "auto" }}
                onClick={() => {
                  this.sendDeleteAcc();
                }}
              >
                Sterge Contul
            </button>
              {!this.state.edit ? (
                <>
                  <button
                    variant="primary"
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      this.toggleEdit();
                    }}
                  >
                    Editeaza
                </button>
                </>
              ) : (
                  <>
                    <button
                      variant="primary"
                      type="button"
                      className="btn btn-success "
                      onClick={() => {
                        this.sendChanges();
                      }}
                    >
                      Salveaza
                </button>
                    <button
                      variant="primary"
                      type="button"
                      className="btn btn-danger "
                      onClick={() => {
                        this.toggleEdit();
                      }}
                    >
                      Renunta
                </button>
                  </>
                )}
              <Button variant="primary" onClick={this.handleClose}>
                Close
            </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
  }
}

function MapStateToProps(state) {
  return {
    role: state.auth.role,
    isAuth: state.auth.isAuthenticated,
    jwtToken: state.auth.token
  };
}

export default connect(MapStateToProps)(ViewAccount);
