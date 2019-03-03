import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import io from 'socket.io-client';


export default class ArheoList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.state.notes = {}
        this.state.sock = {
            socket: io.connect('http://localhost:5000')
        }
        this.state.sock.socket.on(localStorage.getItem('JWT_TOKEN'), () => this.componentDidMount())
    }

    componentDidMount() {
        const jwtToken = localStorage.getItem('JWT_TOKEN');
        Axios.defaults.headers.common['Authorization'] = jwtToken;
        Axios.post('http://localhost:5000/notes/get_notes').then(
            Response => this.setState({ "notes": Response.data.notes })
        );
    }

    renderNotes() {
        const notes = Object.values(this.state.notes);
        var x = notes.map((n) => <div key={n.date} ><h2><Link to={`/note/${n.title}:${n.date}`} >{n.title}</Link></h2></div>)
        return x
    }

    render() {
        return (
            <div>
                {this.renderNotes()}
            </div>
        );
    }
}
