import React, { Component } from "react";
import "../less/CallDetails.css";
import CurrentCallConversation from "./CurrentCallConversation";
import IntentSummary from "./IntentSummary";
import Timeline from "./Timeline";
import PropTypes from "prop-types";
import { sipCall } from "../utils/sipUtils";
import { connect } from "react-redux";

class CallDetails extends Component {
  constructor(props) {
    super(props);
    sipCall("+18558647776");
  }

  render() {
    let intents = null;
    console.log("calldetails duration", this.props.duration);
    if (this.props.onGoingCall) intents = <Timeline call={this.props.call} />;
    else
      intents = (
        <IntentSummary
          summary={this.props.summary}
          summaryFailed={this.props.summaryFailed}
        />
      );
    return (
      <div className="callDetailsRoot">
        {intents}
        <CurrentCallConversation
          callerName={this.props.callerName}
          transcript={this.props.transcript}
          summary={this.props.summary}
          call={this.props.call}
          duration={this.props.duration}
        />
      </div>
    );
  }
}

// CallDetails.propTypes = {
// 	onGoingCall: PropTypes.bool,
// 	callerName: PropTypes.string
// };

// CallDetails.defaultProps = {
// 	onGoingCall: true,
// 	callerName: 'Unknown'
// };

const mapStateToProps = state => {
  return {
    onGoingCall: state.onGoingCall,
    phoneNumber: state.phoneNumber,
    callerName: state.callerName,
    transcript: state.transcript,
    summary: state.summary,
    call: state.call,
    duration: state.duration,
    summaryFailed: state.summaryFailed
  };
};

export default connect(mapStateToProps)(CallDetails);
