import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import Checkbox from "./checkbox";

class ViewAccount extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
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
      let Response = await Axios.get(`http://localhost:5000/${userName}`);
      if (Response) {
        const roles = Object.values(Response.data.foundUser[0].role);
        let checkboxesOptions = this.state.checkboxesOptions;
        if (roles.length > 0)
          roles.map(n => {
            checkboxesOptions[n] = true;
          });
        this.setState({ checkboxesOptions });
        this.setState({
          firstName: Response.data.foundUser[0].firstName,
          lastName: Response.data.foundUser[0].lastName,
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
        `http://localhost:5000/${this.props.userName}`
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
          firstName: Response.data.foundUser[0].firstName,
          lastName: Response.data.foundUser[0].lastName,
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
    data.firstName = this.state.firstName;
    data.lastName = this.state.lastName;
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
      Response = await Axios.post(`http://localhost:5000/edit`, data);
    } else {
      Response = await Axios.post(
        `http://localhost:5000/${this.props.userName}/edit`,
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
      Response = await Axios.delete(`http://localhost:5000/`);
    } else {
      Response = await Axios.delete(
        `http://localhost:5000/${this.props.userName}`
      );
    }
    if (Response.status === 200) {
      this.handleClose();
    }
  }

  resetState() {
    this.setState({
      firstName: "",
      lastName: "",
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
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Nume:
                  </span>
                  <input
                    className="form-control"
                    value={this.state.lastName}
                    onChange={e => {
                      this.setState({ lastName: e.target.value });
                    }}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Prenume:
                  </span>
                  <input
                    className="form-control"
                    value={this.state.firstName}
                    onChange={e => {
                      this.setState({ firstName: e.target.value });
                    }}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Email:
                  </span>
                  <input
                    className="form-control"
                    value={this.state.email}
                    onChange={e => {
                      this.setState({ email: e.target.value });
                    }}
                  />
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Rol:
                  </span>
                  {this.props.userName
                    ? this.roleRender(true)
                    : this.roleRender(false)}
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Parola
                  </span>
                  <input
                    className="form-control"
                    value={this.state.password}
                    onChange={e => {
                      this.setState({ password: e.target.value });
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Nume:{this.state.lastName}
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Prenume:{this.state.firstName}
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Email:{this.state.email}
                  </span>
                </div>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Rol:
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
                  className="btn"
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
