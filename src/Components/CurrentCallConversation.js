import React, { Component } from "react";
import "../less/CurrentCallConversation.css";
import Message from "./Message";
import ChatHead from "./ChatHead";
import Loading from "./Loading";
import axios from "../axios-firebase";

export default class CurrentCallConversation extends Component {
  state = {
    transcript: [],
    summary: null
  };
  componentDidMount() {
    this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transcript !== prevState.transcript) {
      console.log("transcript", nextProps.transcript);
      return { transcript: nextProps.transcript, summary: nextProps.summary };
    }
    return null;
  }

  persistCallHistory = () => {
    console.log(this.props.call);
    let caller = this.props.call;
    let currentCallDetails = {
      transcript: this.props.transcript,
      summary: this.props.summary
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
    axios.put(
      "https://texttractive.firebaseio.com/contact/" + callerId + ".json",
      caller
    );
  };

  render() {
    console.log(this.state.transcript);
    console.log("summary", this.props.summary);
    if (this.props.summary) {
      this.persistCallHistory();
    }
    return (
      <div className="CurrentCallConversationRoot">
        <ChatHead>{this.props.callerName}</ChatHead>
        <div className="chat" ref="chat">
          {/* {this.state.transcript.map(msg => {
						return <Message>msg</Message>;
					})} */}
          <Message left>
            <Loading />
          </Message>
          <div style={{ padding: "2%" }}> </div>
        </div>
      </div>
    );
  }
}
