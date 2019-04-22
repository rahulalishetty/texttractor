import React, { Component } from "react";
import "../less/NewCall.css";

export default class NewCall extends Component {
  state = {
    name: "",
    reason: "",
    phone: ""
  };

  updateName = name => {
    this.setState({ name: name });
  };

  updateReason = reason => {
    this.setState({ reason: reason });
  };

  updatePhone = phone => {
    this.setState({ phone: phone });
  };

  saveForm = () => {
    console.log(this.state.name, this.state.reason, this.state.phone);
    let name = this.state.name;
    let reason = this.state.reason;
    let phone = this.state.phone;
    let newContact = { name, reason, phone };
    this.props.addNewContact(newContact);
  };

  render() {
    return (
      <div className="Form">
        <p style={{ fontSize: "18px" }}>Add New Contact</p>
        <div className="InputForm">
          <div>
            <p className="Label">Name</p>
            <input
              type="text"
              name="name"
              required
              onChange={event => this.updateName(event.target.value)}
            />
          </div>
          <div>
            <p className="Label">Reason To Call</p>
            <input
              type="text"
              name="reason"
              required
              onChange={event => this.updateReason(event.target.value)}
            />
          </div>
          <div>
            <p className="Label">Contact No.</p>
            <input
              type="tel"
              name="name"
              required
              onChange={event => this.updatePhone(event.target.value)}
            />
          </div>
        </div>
        {/* <button className="CloseButton">close</button> */}
        <input
          type="submit"
          className="SaveButton"
          value="save"
          onClick={this.saveForm}
        />
      </div>
    );
  }
}
