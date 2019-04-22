import React, { Component } from "react";
import Header from "./Components/Header";
import CallTable from "./Components/CallTable";
import CallScreen from "./Components/CallScreen";
import Aux from "./Components/Aux";

class App extends Component {
  state = {
    call: null
  };

  makeCall = caller => {
    this.setState({ call: caller });
  };

  render() {
    let show = null;
    if (this.state.call === null) {
      show = (
        <div>
          <Header />
          <CallTable makeCall={this.makeCall} />
        </div>
      );
    } else {
      show = (
        <div>
          <CallScreen caller={this.state.call} />
        </div>
      );
    }

    return <Aux>{show}</Aux>;
  }
}

export default App;
