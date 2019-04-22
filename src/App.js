import React, { Component } from "react";
import Header from "./Components/Header";
import CallTable from "./Components/CallTable";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <CallTable />
      </div>
    );
  }
}

export default App;
