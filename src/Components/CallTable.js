import React, { Component } from "react";
import "../less/CallTable.css";
import CallerList from "./CallerList";
import Modal from "./Modal";
import Add from "@material-ui/icons/Add";
import NewCall from "./NewCall";
import Spinner from "./Spinner";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import axios from "../axios-firebase";

class CallTable extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    let fetchedRows = null;
    axios
      .get("https://texttractive.firebaseio.com/contact.json")
      .then(response => {
        fetchedRows = response.data;
        console.log(Object.values(fetchedRows));
        fetchedRows = Object.values(fetchedRows);
        this.props.addFetchedContactsToState(fetchedRows);
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
    let updatedContacts = this.props.contacts;
    updatedContacts.push(newContact);
    console.log(updatedContacts);
    this.props.addNewContactToState(updatedContacts);
    axios
      .post("/contact.json", newContact)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    let callerTable = <Spinner />;

    if (this.props.contacts) {
      callerTable = (
        <div className="Wrapper">
          <CallerList
            contacts={this.props.contacts}
            placeCall={this.props.placeCall}
          />
          <Add
            style={{
              borderRadius: "50%",
              height: "2rem",
              width: "2rem",
              padding: "0.5rem",
              backgroundColor: "black",
              color: "white"
            }}
            onClick={this.openModal}
            className="Icon"
          />
        </div>
      );
    }

    return (
      <div className="CallTable">
        <Modal show={this.state.showModal} closeModal={this.closeModal}>
          <NewCall addNewContact={this.addNewContact} />
        </Modal>
        <p className="CallQueue">Call Queue</p>
        {callerTable}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFetchedContactsToState: contacts =>
      dispatch({ type: actionTypes.ADD_CONTACTS, payload: contacts }),
    placeCall: contact =>
      dispatch({ type: actionTypes.PLACE_CALL, payload: contact }),
    addNewContactToState: contacts =>
      dispatch({ type: actionTypes.ADD_NEW_CONTACT, payload: contacts })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallTable);
