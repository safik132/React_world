import React from "react";

export default function Crosstable({ headings, sideHeadings, textValues }) {
  return (
    <>
      <div className="table" style={{ margin: "50px 150px" }}>
        <table className="headerKeys">
          <thead>
            <tr className="header">
              <th></th>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sideHeadings.map((sideHeading, rowIndex) => (
              <tr key={rowIndex}>
                <th>{sideHeading}</th>
                {textValues[rowIndex].map((value, colIndex) => (
                  <td key={colIndex} className="Keys">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
