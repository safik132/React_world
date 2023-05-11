import React, { useState } from "react";
import Footer from "../components/Sheet/Footer";
import Header from "../components/Headers/Header";
import DataDisplay from "./DataDisplay/DataDisplay";
import MLModel from "./ML/MLModel";

const AnalyticsMain = () => {
  const [selectanalytic, setselectanalytic] = useState();
  function handleDataDisplay(e) {
    setselectanalytic(e.target.value);
  }
  function handleMLModel(e) {
    setselectanalytic(e.target.value);
  }
  return (
    <>
      <Header />
      <div className="Analytics">
        <div className="typesOfAnalytics">
          <p>Analytics</p>
          <hr></hr>
          <button
            className="Analytics_btn"
            onClick={handleDataDisplay}
            value="Data"
          >
            Data
          </button>
          <br></br>
          <button className="Analytics_btn" onClick={handleMLModel} value="ML">
            ML Model
          </button>
          <br></br>
          <button className="Analytics_btn">Insights</button>
          <button className="Analytics_btn">Deploy Model</button>
        </div>
        {selectanalytic === "Data" ? (
          <DataDisplay />
        ) : selectanalytic === "ML" ? (
          <MLModel />
        ) : (
          <div></div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default AnalyticsMain;
