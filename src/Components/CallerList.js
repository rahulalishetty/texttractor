import React from "react";
import "../less/CallerList.css";
import Call from "@material-ui/icons/Call";

export default function CallerList(props) {
  return (
    <div>
      <table className="CallerTable">
        <tbody>
          <tr className="Row HeaderRow">
            <th style={{ width: "43%" }}>Name</th>
            <th style={{ width: "43%" }}>ReasonToCall</th>
            <th style={{ width: "14%" }}>Type</th>
          </tr>
          {props.rows.map(row => (
            <tr key={row.name} className="Row">
              <td style={{ width: "43%" }}>{row.name}</td>
              <td style={{ width: "43%" }}>{row.reasonToCall}</td>
              <td style={{ width: "14%" }}>
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
                  onClick={event => props.makeCall(row)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
