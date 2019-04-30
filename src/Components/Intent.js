import React, { Component } from "react";
import "../less/Intent.css";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";

export default class Intent extends Component {
  state = {
    decisionMade: false
  };
  spliceIntent = () => {
    this.setState({ decisionMade: true });
    this.props.spliceSummary(this.props.index);
  };
  addIntent = () => {
    this.setState({ decisionMade: true });
  };
  render() {
    let icons = null;
    let root = "IntentRoot";
    if (this.state.decisionMade) {
      root += " ActiveRoot";
    } else {
      icons = (
        <div>
          <span className="Accept" onClick={this.addIntent}>
            <Done />
          </span>
          <span className="Decline" onClick={this.spliceIntent}>
            <Close />
          </span>
        </div>
      );
    }
    return (
      <div className={root}>
        <div
          className="IntentHead"
          style={{ backgroundColor: this.props.color }}
        >
          {this.props.intent}
        </div>
        <div className="IntentBody">{this.props.children}</div>
        {icons}
      </div>
    );
  }
}
