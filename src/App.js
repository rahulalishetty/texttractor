import React, { Component } from "react";
import Header from "./Components/Header";
import CallTable from "./Components/CallTable";
import CallScreen from "./Components/CallScreen";
import Aux from "./Components/Aux";
import axios from "./axios-firebase";

class App extends Component {
  state = {
    call: null,
    showModal: false,
    contacts: null
  };

  componentDidMount() {
    let fetchedRows = null;
    axios
      .get("https://texttractive.firebaseio.com/contact.json")
      .then(response => {
        fetchedRows = response.data;
        console.log(Object.values(fetchedRows));
        fetchedRows = Object.values(fetchedRows);
        this.setState({ contacts: fetchedRows });
      })
      .catch(error => console.log(error));
  }

  openModal = () => {
    console.log("open model");
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  addNewContact = newContact => {
    let updatedContacts = this.state.contacts;
    updatedContacts.push(newContact);
    console.log(updatedContacts);
    this.setState({ contacts: updatedContacts });
    axios
      .post("/contact.json", newContact)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  makeCall = caller => {
    this.setState({ call: caller });
  };

  render() {
    let show = null;
    console.log("show modal", this.state.showModal);
    if (this.state.call === null) {
      show = (
        <div>
          <Header />
          <CallTable
            makeCall={this.makeCall}
            contacts={this.state.contacts}
            openModal={this.openModal}
            closeModal={this.closeModal}
            addNewContact={this.addNewContact}
            showModal={this.state.showModal}
          />
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
