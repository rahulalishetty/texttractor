import React, { Component } from "react";
import "../less/CurrentCallConversation.css";
import Message from "./Message";
import ChatHead from "./ChatHead";
import Loading from "./Loading";
import { splitTranscript } from "../utils/splitTranscript";
import { TRANSCRIPT_DELIMETERS } from "../utils/TRANSCRIPT_DELIMETERS";

export default class CurrentCallConversation extends Component {
  state = {
    transcript: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.transcript !== prevState.transcript) {
      console.log("Transcript updating", nextProps.transcript);
      return { transcript: nextProps.transcript };
    }
    return null;
  }

  componentDidUpdate() {
    this.refs.chat.scrollTop = this.refs.chat.scrollHeight;
  }

  render() {
    let chat = null;

    if (this.props.transcript) {
      let splitTranscription = splitTranscript(this.props.transcript);
      chat = splitTranscription.map((c, index) => {
        console.log("trans: ", c);
        if (c.includes(TRANSCRIPT_DELIMETERS.DETECTING_SPEAKERS)) {
          return (
            <Message key={"message" + index} speaking>
              {c.replace(TRANSCRIPT_DELIMETERS.DETECTING_SPEAKERS, "")}
              <Loading />
            </Message>
          );
        } else if (c.includes(TRANSCRIPT_DELIMETERS.COLLECTOR)) {
          return (
            <Message key={"message" + index}>
              {c.replace(TRANSCRIPT_DELIMETERS.COLLECTOR, "")}
            </Message>
          );
        } else if (c.includes(TRANSCRIPT_DELIMETERS.CUSTOMER)) {
          return (
            <Message
              key={"message" + index}
              customerName={this.props.callerName}
              left
            >
              {c.replace(TRANSCRIPT_DELIMETERS.CUSTOMER, "")}
            </Message>
          );
        }
        return null;
      });
    }

    return (
      <div className="CurrentCallConversationRoot">
        <ChatHead>Call Transcription</ChatHead>
        <div className="chat" ref="chat">
          {chat}
          <div style={{ padding: "2%" }}> </div>
        </div>
      </div>
    );
  }
}
