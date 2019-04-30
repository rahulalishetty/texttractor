import React, { Component } from "react";
import "../less/IntentSummary.css";
import Intent from "./Intent";
import Spinner from "./Spinner";
import axios from "../axios-firebase";

export default class IntentSummary extends Component {
  state = {
    persistantSummary: null,
    saved: false
  };

  persistantSummary = () => {
    console.log("in persist", this.props.call);
    let caller = this.props.call;
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes();
    console.log("header duration", this.props.duration);
    let currentCallDetails = {
      transcript: this.props.transcript,
      summary: this.state.persistantSummary,
      date: date,
      time: time,
      duration: this.props.duration
    };
    let callerId = caller.key;
    delete caller.key;
    if (caller.callHistory === undefined) {
      Object.assign(caller, { callHistory: [] });
      caller.callHistory.push(currentCallDetails);
    } else {
      caller.callHistory.push(currentCallDetails);
    }
    console.log(caller);
    if (callerId) {
      axios.put(
        "https://texttractive.firebaseio.com/contacts/" + callerId + ".json",
        caller
      );
      this.setState({ saved: true });
    }
  };

  componentDidMount() {
    this.refs.preCall.scrollTop = this.refs.preCall.scrollHeight;
    this.setState({ persistantSummary: this.props.summary });
  }

  spliceSummary = index => {
    console.log("index", index);
    let updatedSummary = this.state.persistantSummary;
    updatedSummary.splice(index, 1);
    console.log(updatedSummary);
    this.setState({ persistantSummary: updatedSummary });
  };

  getIntents = summary => {
    const colors = ["#757575", "#ff5722", "#795548", "#78909c"];
    // this.setState({ persistantSummary: summaryWithSelectedFlag });
    return summary.map((eachSummary, index) => {
      return (
        <Intent
          key={index}
          intent={eachSummary.intent}
          color={colors[index % 4]}
          index={index}
          spliceSummary={this.spliceSummary}
        >
          {eachSummary.summary}
        </Intent>
      );
    });
  };

  render() {
    // if (this.props.summary && this.props.call) {
    //   this.persistCallHistory();
    // }
    let intents = <Spinner />;
    console.log(this.props.summary);
    if (this.props.summary) {
      intents = this.getIntents(this.props.summary);
    } else if (this.props.summaryFailed) {
      intents = <p>sorry, could not get summary for this call</p>;
    }
    return (
      <div className="IntentSummaryRoot" ref="preCall">
        {intents}
        <span className="SaveButtonForSummary">
          <button onClick={this.persistantSummary} disabled={this.state.saved}>
            Save
          </button>
        </span>
      </div>
    );
  }
}
