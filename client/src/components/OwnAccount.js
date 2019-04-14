import React, { Component } from 'react'
import 'react-dropdown/style.css'
import { Modal, Button } from 'react-bootstrap'
import { create } from 'apisauce'
export default class ViewOwnAccount extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: [],
      show: false,
      edit: false
    }
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
    this.setState({ governorOptions: this.props.governorOptions })
  }


  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }
  componentWillMount() {
    const api = create({
      baseURL: `http://localhost:5000`,
      headers: { Authorization:localStorage.getItem('zeBilet')}
    })
    const { ok, data, problem, status } = await api.get('/')
    if (!ok) {
      console.log('Not OK')
    } else {
      console.log(data)
      // if (data !== 'undefined') {
      //   this.setState({})
      // }
    }
  }
  sendChanges(){

  }
  resetState() {
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: [],
      edit: false
    })
  }

  render() {
    return (
      <>
        <Button variant='primary' className='button' style={{ marginRight: '10px' }} onClick={() => { this.handleShow(); this.resetState() }}>Add New LogFile</Button>
        <Modal show={this.state.show} onEscapeKeyDown={this.handleClose} >
          <Modal.Header closeButton onHide={this.handleClose}>
            <Modal.Title>{this.state.userName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.edit ? <>
            <div className='input-group' >
              <span className='input-group-text' id='inputGroup-sizing-sm'>Nume:</span>
              <input className='form-control' value={this.state.v} onChange={(e) => { this.setState({ v: e.target.value }) }} />
            </div>
            <div className='input-group' >
              <span className='input-group-text' id='inputGroup-sizing-sm'>Prenume:</span>
              <input className='form-control' value={this.state.v} onChange={(e) => { this.setState({ v: e.target.value }) }} />
            </div>
            <div className='input-group' >
              <span className='input-group-text' id='inputGroup-sizing-sm'>Email:</span>
              <input className='form-control' value={this.state.v} onChange={(e) => { this.setState({ v: e.target.value }) }} />
            </div>
            <div className='input-group' >
              <span className='input-group-text' id='inputGroup-sizing-sm'>Rol:</span>
              <input className='form-control' value={this.state.v} onChange={(e) => { this.setState({ v: e.target.value }) }} />
            </div>
            <div className='input-group' >
              <span className='input-group-text' id='inputGroup-sizing-sm'>Parola</span>
              <input className='form-control' value={this.state.v} onChange={(e) => { this.setState({ v: e.target.value }) }} />
            </div>
          </> : <>
              <div className='input-group' >
                <span className='input-group-text' id='inputGroup-sizing-sm'>Nume:{this.state.lastName}</span>
              </div>
              <div className='input-group' >
                <span className='input-group-text' id='inputGroup-sizing-sm'>Prenume:{this.state.firstName}</span>
              </div>
              <div className='input-group' >
                <span className='input-group-text' id='inputGroup-sizing-sm'>Email:{this.state.email}</span>
              </div>
              <div className='input-group' >
                <span className='input-group-text' id='inputGroup-sizing-sm'>Rol:{this.state.role}</span>
              </div>
            </>}
          </Modal.Body>
          <Modal.Footer>
          {!this.state.edit?<>
            <button variant='primary' type='button' className='btn' onClick={() => { this.toggleEdit() }}>
              Editeaza
                </button>
          </>:<>
          <button variant='primary' type='button' className='btn btn-success ' onClick={() => { this.sendChanges() }}>
              Salveaza
                </button>
                <button variant='primary' type='button' className='btn btn-danger ' onClick={() => { this.toggleEdit();this.resetState() }}>
              Renunta
                </button>
          </>}
          <Button variant='primary' onClick={this.handleClose}>Close</Button>

            </Modal.Footer>
        </Modal>
      </>);
  }
}




