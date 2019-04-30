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
    let persistSummary = this.state.persistantSummary;
    persistSummary.forEach(eachSummary => {
      delete eachSummary.decisionMade;
    });
    console.log(persistSummary);
    let currentCallDetails = {
      transcript: this.props.transcript,
      summary: persistSummary,
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
    let requiredSummary = this.props.summary;
    if (!this.state.decisionMade) {
      requiredSummary.forEach((eachSummary, index) => {
        Object.assign(eachSummary, {
          decisionMade: false
        });
      });
    }
    this.setState({ persistantSummary: requiredSummary });
  }

  spliceSummary = index => {
    console.log("index", index);
    let updatedSummary = this.state.persistantSummary;
    updatedSummary.splice(index, 1);
    console.log(updatedSummary);
    this.setState({ persistantSummary: updatedSummary });
  };

  addIntent = index => {
    let updatedSummary = this.state.persistantSummary;
    updatedSummary[index].decisionMade = true;
    this.setState({ persistantSummary: updatedSummary });
  };

  getIntents = summary => {
    // this.setState({ persistantSummary: summaryWithSelectedFlag });
    const colors = ["#757575", "#ff5722", "#795548", "#78909c"];
    return summary.map((eachSummary, index) => {
      return (
        <Intent
          key={index}
          intentSummary={eachSummary}
          index={index}
          spliceSummary={this.spliceSummary}
          addIntent={this.addIntent}
          color={colors[index % 4]}
          saved={this.state.saved}
        >
          {eachSummary.summary}
        </Intent>
      );
    });
  };

  allDecisionOnIntentsComplete = () => {
    let summary = this.state.persistantSummary;
    if (summary) {
      let decisionFlag = true;
      summary.forEach(eachSummary => {
        if (!eachSummary.decisionMade) decisionFlag = false;
      });
      return decisionFlag;
    } else {
      return false;
    }
  };

  render() {
    // if (this.props.summary && this.props.call) {
    //   this.persistCallHistory();
    // }
    if (this.allDecisionOnIntentsComplete()) {
      this.persistantSummary();
    }
    let intents = null;
    console.log(this.state.persistantSummary);
    if (this.state.persistantSummary) {
      intents = this.getIntents(this.state.persistantSummary);
    }
    return (
      <div className="IntentSummaryRoot" ref="preCall">
        {intents}
        <span className="SaveButtonForSummary">
          {/* <button onClick={this.persistantSummary} disabled={this.state.saved}>
            Save
          </button> */}
        </span>
      </div>
    );
  }
}
