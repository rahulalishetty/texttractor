import React, { Component } from "react";
import "../less/CallTable.css";
import CallerList from "./CallerList";
import Modal from "./Modal";
import Add from "@material-ui/icons/Add";
import NewCall from "./NewCall";

export default class CallTable extends Component {
  state = {
    showModal: false,
    rows: []
  };

  componentDidMount() {
    this.setState({
      rows: [
        this.createData("abc", "Reg. Payment", "7386909030"),
        this.createData("cde", "to Connect", "7386909031"),
        this.createData("Eclair", "just for fun", "7386909032"),
        this.createData("Cupcake", "did not respond", "7386909034"),
        this.createData("Gingerbread", "hanged", "7386909036")
      ]
    });
  }

  createData = (name, reasonToCall, phone) => {
    return { name, reasonToCall, phone };
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  addNewContact = newContact => {
    let updatedList = this.state.rows;
    newContact = this.createData(newContact.name, newContact.reason);
    updatedList.push(newContact);
    this.setState({ rows: updatedList });
  };

  render() {
    return (
      <div className="CallTable">
        <Modal show={this.state.showModal} closeModal={this.closeModal}>
          <NewCall addNewContact={this.addNewContact} />
        </Modal>
        {/* <p className="CallQueue">Call Queue</p> */}
        <p className="CallQueue">Call Queue</p>
        <div className="Wrapper">
          <CallerList rows={this.state.rows} makeCall={this.props.makeCall} />
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
      </div>
    );
  }
}
