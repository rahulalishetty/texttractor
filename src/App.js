import React, { Component } from "react";
import Header from "./Components/Header";
import CallTable from "./Components/CallTable";
import CallScreen from "./Components/CallScreen";
import Aux from "./Components/Aux";
import { connect } from "react-redux";

class App extends Component {
  render() {
    let show = null;
    if (this.props.call === null) {
      show = (
        <div>
          <Header />
          <CallTable
            makeCall={this.makeCall}
            addNewContact={this.addNewContact}
          />
        </div>
      );
    } else {
      show = (
        <div>
          <CallScreen caller={this.props.call} />
        </div>
      );
    }

    return <Aux>{show}</Aux>;
  }
}

const mapStateToProps = state => {
  return {
    call: state.call
  };
};

export default connect(mapStateToProps)(App);
