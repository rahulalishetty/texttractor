import React, { Component } from "react";
import "../less/NewCall.css";

export default class NewCall extends Component {
  state = {
    name: "",
    reasonToCall: "",
    phone: ""
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return (
      nextState.name !== this.state.name ||
      nextState.reasonToCall !== this.state.reasonToCall ||
      nextState.phone !== this.state.phone
    );
  };

  clearState = () => {
    console.log("set state nulled");
    this.setState({ name: "", reasonToCall: "", phone: "" });
  };

  updateName = name => {
    this.setState({ name: name });
  };

  updateReason = reason => {
    this.setState({ reasonToCall: reason });
  };

  updatePhone = phone => {
    this.setState({ phone: phone });
  };

  saveForm = exitFlag => {
    console.log(this.state.name, this.state.reasonToCall, this.state.phone);
    let name = this.state.name;
    let reasonToCall = this.state.reasonToCall;
    let phone = this.state.phone;
    let phoneRegex = "^[2-9]{2}[0-9]{8}$";
    if (phone.match(phoneRegex)) {
      let callHistory = [];
      console.log(name, reasonToCall, phone);
      let newContact = { name, reasonToCall, phone, callHistory };
      let storedFlag = this.props.addNewContact(newContact);
      console.log("contact stored:", storedFlag);
      if (storedFlag) {
        if (exitFlag) this.closeModal();
        else this.clearState();
      }
    } else {
      alert("enter valid phone number");
    }
  };

  validateInputField = () => {};

  closeModal = () => {
    this.clearState();
    this.props.closeModal();
  };
  render() {
    console.log(this.props.show);
    console.log(
      "redner",
      this.state.name,
      this.state.reasonToCall,
      this.state.phone
    );
    let name = this.state.name;
    let reasonToCall = this.state.reasonToCall;
    let phone = this.state.phone;
    let phoneRegex = "^[2-9]{2}[0-9]{8}$";
    let disabledFlag = true;
    if (phone.match(phoneRegex) && name !== "" && reasonToCall !== "")
      disabledFlag = false;
    console.log("dis flag: ", disabledFlag);
    return (
      <div className="Form">
        <p style={{ fontSize: "18px" }} className="FormLabel">
          Add Contact
        </p>
        <span className="Close" onClick={this.closeModal}>
          &times;
        </span>
        <div className="InputForm">
          <div>
            <p className="Label">Name *</p>
            <input
              type="text"
              name="name"
              required
              onChange={event => this.updateName(event.target.value)}
              className="InputField"
              value={this.state.name}
            />
          </div>
          <div>
            <p className="Label">Reason To Call *</p>
            <input
              type="text"
              name="reason"
              required
              onChange={event => this.updateReason(event.target.value)}
              className="InputField"
              value={this.state.reasonToCall}
            />
          </div>
          <div>
            <p className="Label">Contact No. *</p>
            <input
              type="tel"
              name="name"
              required
              onChange={event => this.updatePhone(event.target.value)}
              className="InputField"
              value={this.state.phone}
            />
          </div>
        </div>
        {/* <button className="CloseButton">close</button> */}
        <div className="ButtonBar">
          <input
            type="submit"
            className="SaveButton"
            value="create contact"
            onClick={() => this.saveForm(true)}
            style={{ width: "30%" }}
            disabled={disabledFlag}
          />
          <input
            type="submit"
            className="SaveButton"
            value="create and add another"
            onClick={() => this.saveForm(false)}
            style={{ width: "50%" }}
            disabled={disabledFlag}
          />
          {/* <input
            type="submit"
            className="SaveButton Cancel"
            value="cancel"
            style={{ width: "20%" }}
          /> */}
        </div>
      </div>
    );
  }
}
