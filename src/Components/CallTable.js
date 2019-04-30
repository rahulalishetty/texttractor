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
    showModal: false,
    contacts: [],
    fetched: false
  };

  componentDidMount() {
    let fetchedRows = null;
    axios
      .get("https://texttractive.firebaseio.com/contacts.json")
      .then(response => {
        fetchedRows = response.data;
        let fetchedRowsWithKey = [];
        Object.keys(fetchedRows).map(rowKey => {
          console.log(fetchedRows[rowKey]);
          fetchedRowsWithKey.push(
            Object.assign(fetchedRows[rowKey], { key: rowKey })
          );
          console.log(fetchedRowsWithKey);
        });
        console.log(fetchedRowsWithKey);
        // fetchedRows = Object.values(fetchedRows);
        // this.props.addFetchedContactsToState(fetchedRowsWithKey);
        this.setState({ contacts: fetchedRowsWithKey, fetched: true });
        console.log("state set");
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
    let contactAlreadyExist = false;
    if (updatedContacts) {
      updatedContacts.map(eachContact => {
        if (eachContact.phone === newContact.phone) {
          console.log("contact already exists");
          contactAlreadyExist = true;
        }
      });
    }

    if (!contactAlreadyExist) {
      this.addNewContactWithKeyToState(newContact, updatedContacts);
      return true;
    } else {
      alert("contact already exists");
      return false;
    }
  };

  addNewContactWithKeyToState = (newContact, updatedContacts) => {
    axios
      .post("/contacts.json", newContact)
      .then(response => {
        console.log(response);
        axios
          .get("https://texttractive.firebaseio.com/contacts.json")
          .then(response => {
            let fetchedRows = response.data;
            let newRow = null;
            Object.keys(fetchedRows).map(rowKey => {
              if (fetchedRows[rowKey].phone === newContact.phone) {
                newRow = fetchedRows[rowKey];
                Object.assign(newRow, { key: rowKey });
                console.log("new key for new contact", newRow);
              }
            });
            updatedContacts.push(newRow);
            // this.props.addNewContactToState(updatedContacts);
            this.setState({ contacts: updatedContacts });
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  };

  render() {
    let callerTable = <Spinner />;
    // let callerTable = null;
    console.log(this.state.fetched);
    if (this.state.fetched) {
      console.log("inside if");
      callerTable = (
        <div className="Wrapper">
          <CallerList
            contacts={this.state.contacts}
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
          <NewCall
            addNewContact={this.addNewContact}
            closeModal={this.closeModal}
            show={this.state.showModal}
          />
        </Modal>
        <p className="CallQueue">Call Queue</p>
        {callerTable}
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     contacts: state.contacts
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    placeCall: contact =>
      dispatch({ type: actionTypes.PLACE_CALL, payload: contact })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CallTable);
