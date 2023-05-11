import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import LinearRegression from "./LinearRegression";
import AnalyzeData from "../DataDisplay/AnalyzeData";
import MultipleRegression from "./MultipleRegression";
import MLForm from "./MLForm";

const MLModel = () => {
  const [xArr, setxArr] = useState([]);
  const [yArr, setyArr] = useState([]);
  const [x1Arr, setx1Arr] = useState([]);
  const [cop, setCop] = useState([]);
  const [cop1, setCop1] = useState([]);

  const [predictValue, setPredictValue] = useState([]);
  const [rege, setRege] = useState([]);

  const {
    selectedWB,
    selectedWBSheet,
    selectedSheet,
    numberofColumns,
    numberofRows,
    setNumberofColumns,
    setNumberofRows,
    setSelectedWB,
    columns,
    setColumns,
    dataFormat,
  } = useContext(GlobalContext);
  const [display, setDisplay] = useState();

  return (
    <>
      <div className="DataDisplay">
        <button
          className="Analytics_btn"
          onClick={(e) => setDisplay(e.target.value)}
          value="describe_data"
        >
          Predictive Analysis
        </button>
        <button
          className="Analytics_btn"
          value="Multi_regression"
          onClick={(e) => setDisplay(e.target.value)}
        >
          Regression
        </button>
        <button
          className="Analytics_btn"
          value="analyze_data"
          onClick={(e) => setDisplay(e.target.value)}
        >
          Algorithm
        </button>
        <button
          className="Analytics_btn"
          value="ml_form"
          onClick={(e) => setDisplay(e.target.value)}
        >
          ML Form
        </button>
        {display === "describe_data" ? (
          <LinearRegression />
        ) : display === "Multi_regression" ? (
          <MultipleRegression />
        ) : display === "analyze_data" ? (
          <AnalyzeData />
        ) : display === "ml_form" ? (
          <MLForm />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};
export default MLModel;
