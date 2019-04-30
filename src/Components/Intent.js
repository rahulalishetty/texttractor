import React, { Component } from "react";
import "../less/Intent.css";
import Done from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
// import Close from "../images/cross.jpg";

export default class Intent extends Component {
  // state = {
  //   decisionMade: false
  // };

  // spliceIntent = () => {
  //   this.props.spliceSummary(this.props.index);
  // };

  // addIntent = () => {
  //   // this.setState({ decisionMade: true });
  // };

  render() {
    console.log(this.props.intentSummary);
    let icons = null;
    let root = "IntentRoot";
    if (this.props.intentSummary.decisionMade || this.props.saved) {
      root += " ActiveRoot";
    } else {
      icons = (
        <div>
          <span
            className="Accept"
            onClick={() => this.props.addIntent(this.props.index)}
          >
            <Done />
          </span>
          <span
            className="Decline"
            onClick={() => this.props.spliceSummary(this.props.index)}
          >
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
          {this.props.intentSummary.intent}
        </div>
        <div className="IntentBody">{this.props.children}</div>
        {icons}
      </div>
    );
  }
}
