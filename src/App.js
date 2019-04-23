import React, { Component } from "react";
import Header from "./Components/Header";
import CallTable from "./Components/CallTable";
import CallDetails from "./Components/CallDetails";
import { sipRegister } from "./utils/sipUtils";
import { connect } from "react-redux";
import * as actionTypes from "./store/actions";

class App extends Component {
  constructor(props) {
    super(props);
    sipRegister();
  }

  render() {
    let show = null;
    if (this.props.call === null) {
      show = (
        <CallTable
          makeCall={this.makeCall}
          addNewContact={this.addNewContact}
        />
      );
    } else {
      show = (
        <CallDetails
          onGoingCall={this.props.onGoingCall}
          callerName={this.props.call.name}
        />
      );
    }
    return (
      <div className="AppRoot">
        <Header
          callscreen={this.props.onGoingCall}
          phone={this.props.phoneNumber}
          duration="02:23"
          endCall={this.props.endCall}
          goToHomePage={this.props.goToHomePage}
        />
        {show}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    call: state.call,
    onGoingCall: state.onGoingCall,
    phoneNumber: state.phoneNumber
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goToHomePage: () => dispatch({ type: actionTypes.GOTO_HOME }),
    endCall: () => dispatch({ type: actionTypes.END_CALL })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
