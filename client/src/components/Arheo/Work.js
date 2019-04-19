import React, { Component } from "react";

class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      works: [
        {
          start: "",
          end: "",
          title: "",
          text: ""
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="title"
          className="form-control m-3"
          placeholder="Title"
          onChange={e => this.setState({ title: e.target.value })}
        />
        <input
          type="text"
          name="text"
          className="form-control m-3"
          placeholder="Text"
          onChange={e => this.setState({ text: e.target.value })}
        />
        <input
          type="datetime-local"
          name="start"
          className="form-control m-3"
          placeholder="Start"
          onChange={e => this.setState({ start: e.target.value })}
        />
        <input
          type="datetime-local"
          name="end"
          className="form-control m-3"
          placeholder="End"
          onChange={e => this.setState({ end: e.target.value })}
        />
        {console.log(this.state)}
      </div>
    );
  }
}

export default Work;
