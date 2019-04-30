import React, { Component } from "react";

export default class ChatHead extends Component {
  styleRoot = {
    display: "inline-block",
    padding: "3%",
    boxShadow: "0 2px 5px grey",
    width: "94%"
  };
  styleChildren = {
    display: "inline",
    float: "left",
    textAlign: "center",
    fontSize: "13px"
  };
  render() {
    return (
      <div style={this.styleRoot}>
        <div style={this.styleChildren}>{this.props.children}</div>
      </div>
    );
  }
}
