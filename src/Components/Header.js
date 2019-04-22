import React, { Component } from "react";
import "../less/Header.css";
import logo from "../images/zemoso_logo.png";

export default class Header extends Component {
  render() {
    return (
      <div className="callScreenHeaderRoot">
        <img src={logo} alt="logo" />
      </div>
    );
  }
}
