import React from "react";
import "../less/CallerList.css";
import Call from "@material-ui/icons/Call";

export default function CallerList(props) {
  return (
    <div>
      <table className="CallerTable">
        <tbody>
          <tr className="Row HeaderRow">
            <th style={{ width: "30%" }}>Name</th>
            <th style={{ width: "50%" }}>ReasonToCall</th>
            <th style={{ width: "15%" }}>Type</th>
          </tr>
          {props.contacts.map(contact => {
            console.log(contact);
            return (
              <tr key={contact.phone} className="Row">
                <td style={{ width: "25%" }}>{contact.name}</td>
                <td style={{ width: "50%" }}>{contact.reasonToCall}</td>
                <td style={{ width: "15%" }}>
                  <Call
                    style={{
                      backgroundColor: "#239B56",
                      borderRadius: "50%",
                      height: "1.5rem",
                      width: "1.5rem",
                      padding: "0.4rem",
                      color: "white",
                      marginTop: "0.2rem"
                    }}
                    onClick={event => props.placeCall(contact)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
