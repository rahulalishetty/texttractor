import React, { Component } from "react";
import "../less/Header.css";
import logo from "../images/zemoso_logo.png";
import CallEnd from "@material-ui/icons/CallEnd";

export default class Header extends Component {
  render() {
    if (this.props.callscreen)
      return (
        <div className="callScreenHeaderRoot">
          <img src={logo} alt="logo" />
          <p className="connecting">
            Connecting to: {this.props.contactNumber}
          </p>
          <div className="endCallParent">
            <CallEnd className="endCall" onClick={this.props.endCall} />
          </div>
          <p className="callDuration">{this.props.duration}</p>
        </div>
      );
    else
      return (
        <div className="callScreenHeaderRoot">
          <img src={logo} alt="logo" />
        </div>
      );
  }
}
