import React, { Component } from "react";

class Popup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("props from popup", this.props);
    return (
      <div className="overlay">
        <div className="popup">
          <div className="popup_inner text-center">
            <p className="p-5">{this.props.bibliografie}</p>
            <button
              className="btn btn-danger m-2"
              onClick={this.props.closePopup}
            >
              Inchide
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
