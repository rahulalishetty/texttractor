import React, { Component } from "react";

import "../less/Modal.css";
import Aux from "./Aux";
import Backdrop from "./BackDrop";

class Modal extends Component {
  //   shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     return (
  //       nextProps.show !== this.props.show ||
  //       nextProps.children !== this.props.children
  //     );
  //   }

  //   componentWillUpdate() {
  //     console.log("modal updated");
  //   }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
