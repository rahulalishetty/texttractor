import React, { Component } from "react";
import "../less/PreviousCallDetails.css";
import Intent from "./Intent";
import Spinner from "./Spinner";

export default class PreviousCallDetails extends Component {
  state = {
    summary: null
  };
  componentDidMount() {
    this.refs.preCall.scrollTop = this.refs.preCall.scrollHeight;
  }

  //   static getDerivedStateFromProps(nextProps, prevState) {
  //     if (nextProps.summary !== prevState.summary) {
  //       console.log("summary", nextProps.summary);
  //       return { summary: nextProps.summary };
  //     }
  //     return null;
  //   }

  getIntents = summary => {
    return summary.map((eachSummary, index) => {
      return (
        <Intent key={index} intent={eachSummary.intent}>
          {eachSummary.summary}
        </Intent>
      );
    });
  };

  render() {
    let intents = <Spinner />;
    console.log(this.props.summary);
    if (this.props.summary) {
      intents = this.getIntents(this.props.summary);
    }
    return (
      <div className="PreviousCallDetailsRoot" ref="preCall">
        {/* <Intent intent="Intent Head">Body of the intent</Intent>
        <Intent intent="Intent Head">
          Body of the intent Body of the intent{" "}
        </Intent>
        <Intent intent="Intent Head Body of the intent ">
          Body of the intent
        </Intent>
		<Intent intent="Intent Head">Body of the intent</Intent> */}
        {intents}
      </div>
    );
  }
}
