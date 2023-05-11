import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Plot from "react-plotly.js";
import SimpleLinearRegression from "ml-regression-simple-linear";
const LinearRegression = () => {
  const [xArr, setxArr] = useState([]);
  const [yArr, setyArr] = useState([]);
  const [x1Arr, setx1Arr] = useState([]);
  const [cop, setCop] = useState([]);
  const [cop1, setCop1] = useState([]);
  const [predictValue, setPredictValue] = useState([]);
  const [rege, setRege] = useState([]);
  const { columns, dataFormat } = useContext(GlobalContext);
  function handlePrediction() {
    const regression = new SimpleLinearRegression(xArr, yArr);
    const sfa = Number(predictValue);
    const reg = regression.predict([sfa]);
    setRege(reg);
    setxArr((prev) => [...prev, sfa]);
    setyArr((prev) => [...prev, ...reg]);
  }
  function handlePredict(e) {
    setPredictValue(e.target.value);
  }
  const handleSelectedValue = (e) => {
    setCop(e.target.value);
    const value = dataFormat[cop];
    setxArr(value);
  };
  const handleSelectedValue1 = (e) => {
    setCop1(e.target.value);
    const value = dataFormat[cop1];
    setyArr(value);
  };
  return (
    <>
      <div
        style={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontSize: "30px",
          }}
        >
          Simple Linear Regression
        </h1> */}
        <div className="variables">
          <p>
            Select Independent Variable :
            <select onClick={handleSelectedValue}>
              {columns.map((x) => {
                return <option value={x}>{x}</option>;
              })}
            </select>
          </p>
          <p>
            Select Dependent Variable :
            <select onClick={handleSelectedValue1}>
              {columns.map((x) => {
                return <option value={x}>{x}</option>;
              })}
            </select>
          </p>
          <input type="number" onChange={handlePredict} />
          <button onClick={handlePrediction} className="HeaderBtn">
            Predictive Analysis
          </button>

          {rege}
        </div>

        <Plot
          data={[
            {
              x: xArr,
              y: yArr,
              type: "line",
            },
          ]}
          layout={{
            xaxis: { title: { text: cop } },
            yaxis: { title: { text: cop1 } },
            width: 1040,
            height: 440,
            fontSize: 2,
          }}
        />
      </div>
    </>
  );
};
export default LinearRegression;
