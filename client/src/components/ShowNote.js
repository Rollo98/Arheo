// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Axios from 'axios';
// import io from 'socket.io-client';


// export default class ShowNote extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//         this.state.note = {}
//         this.state.sock = {
//             socket: io.connect('http://localhost:5000')
//         }
//         this.state.sock.socket.on(localStorage.getItem('JWT_TOKEN'), () => this.componentDidMount())
//     }

//     async componentWillMount() {
//         let data = { title: this.props.title, date: this.props.date }
//         await Axios.post('http://localhost:5000/notes/get_note', data).then(
//             Response => this.setState({ "note": Response.data.noteFound[0] })
//         );
//     }

//     render() {
//         return (
//             <div>
//                 <h1>{this.state.note.title}</h1>
//                 <div>{this.state.note.body}</div>
//             </div>
//         );
//     }
// }


