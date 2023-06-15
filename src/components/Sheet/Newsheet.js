import React, { useEffect, useContext, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { isEmpty } from "lodash";
import Plot from "react-plotly.js";
import { FaTrash } from "react-icons/fa";
import { GlobalContext } from "../../GlobalProvider";
import Header from "../Headers/Header";
import Footer from "./Footer";
import ImportExcel from "./ImportExcel";
import { Scrollbars } from "react-custom-scrollbars-2";
import Granularity from "./Granularity";
import Filter from "./Filter";
import Condition from "./Condition";
import Menu from "../../Menu";
import { logoutUser } from "../actions/authActions";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import Header2 from "../Headers/Header2";
import axios from "axios";
import Crosstable from "./Crosstable";
import Plotss from "./Plotss";

const Sheet = (props) => {
  const [sheetParams, setSheetParam] = useState();
  const [scopemap, setScopeMap] = useState();
  const [locationData, setLocationData] = useState([]);
  // const [lon, setLon] = useState();
  // const [lat, setLat] = useState();
  const [sortedData, setSortedData] = useState({ x: [], y: [] });
  const [tableData, setTableData] = useState(null);
  const [selected, setSelected] = useState();
  const [rowID, setROwID] = useState();
  const [colID, setColID] = useState();
  const [rowLength, setRowLength] = useState();
  const [pData, setPData] = useState();
  const [rowData, setRowData] = useState();
  const [colData, setColData] = useState();

  const {
    setMatchUser,
    columns,
    sheets,
    setSheets,
    selectedSheet,
    setSelectedSheet,
    selectedWB,
    setSelectedWB,
    selectedWBSheet,
    setSelectedWBSheet,
    filterValue,
    filterOperator,
    filterType,
    sortType,
    setSortType,
    setStorys,
    sort,
    setSort,
    showMenu,
    setLoginUsername,
    setIsOpe,
    modalIsOpen,
    setIsOpen,
  } = useContext(GlobalContext);
  const dragItem = useRef();
  const sheetParam = useParams().sheet;
  const navigate = useNavigate();
  // Navigate to Home Page
  async function homehandler(event) {
    event.preventDefault();
    navigate("/", { replace: true });
  }
  //sheet based on checkbox
  const handleSheetChange = (event) => {
    setSelectedWBSheet(event.target.value);
  };

  // to get particular row/column data
  const processCsv = (jsonData) => {
    const head = jsonData[0];
    const rows = jsonData.slice(1);
    const newArray = rows.map((row) => {
      const values = row;
      const eachObject = head.reduce((obj, header, i) => {
        obj[header] = values[i];

        return obj;
      }, {});

      return eachObject;
    });
    return newArray;
  };
  const handleDrop = (index) => {
    const dragValue = dragItem.current;
    // const field = event.currentTarget.id;
    const updatedSheet = sheets.find((sheet) => sheet.name === sheetParam);
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dragValue]
    );
    const tempSheets = sheets.map((s) =>
      s.name === sheetParam
        ? { ...s, ["field"]: { key: dragValue, values: plotValue } }
        : s
    );
    updatedSheet.rows[index] = { key: dragValue, values: plotValue };
    setRowLength(updatedSheet.rows.length);
    setSheets(tempSheets);
  };
  const handleDropCol = (index) => {
    const dragValue = dragItem.current;
    // const field = event.currentTarget.id;
    const updatedSheet = sheets.find((sheet) => sheet.name === sheetParam);
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dragValue]
    );
    const tempSheets = sheets.map((s) =>
      s.name === sheetParam
        ? { ...s, ["col"]: { key: dragValue, values: plotValue } }
        : s
    );
    updatedSheet.cols[index] = { key: dragValue, values: plotValue };
    setSheets(tempSheets);
  };
  //Graph Selection
  const selectGraph = (event) => {
    const tempSheets = sheets.map((s) =>
      s.name === sheetParam
        ? {
            ...s,
            graph: event.target.value,
          }
        : s
    );
    setSheets(tempSheets);
  };

  const wordCloud = () => {
    var x = document.getElementById("wordCloud");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  };

  //Delete Values
  const deleteValues = (e) => {
    console.log(rowID);
    if (e.currentTarget.id === "row") {
      const tempSheets = sheets.map((s) =>
        s.name === sheetParam ? { ...s, row: {} } : s
      );
      setSheets(tempSheets);
    }
    if (e.currentTarget.id === "col") {
      const tempSheets = sheets.map((s) =>
        s.name === sheetParam ? { ...s, col: {} } : s
      );
      setSheets(tempSheets);
    }

    if (e.currentTarget.id === rowID) {
      const tempSheets = sheets.map((s) =>
        s.name === sheetParam ? { ...s, rowID: {} } : s
      );
      setSheets(tempSheets);
    }
    if (e.currentTarget.id === "groupby") {
      const tempSheets = sheets.map((s) =>
        s.name === sheetParam ? { ...s, groupby: {} } : s
      );
      setSheets(tempSheets);
    }
    if (e.currentTarget.id === "text") {
      const tempSheets = sheets.map((s) =>
        s.name === sheetParam ? { ...s, text: {} } : s
      );
      setSheets(tempSheets);
    }
    if (e.currentTarget.id === "sort") {
      const tempSheets = sheets.map((s) =>
        s.name === sheetParam ? { ...s, sort: {} } : s
      );
      setSheets(tempSheets);
    }
  };
  function parseWithNaN(jsonString) {
    return JSON.parse(jsonString.replace(/NaN/g, "null"));
  }

  // ========================  table calculation API  ============================

  // axios
  //   .post("https://python-api-productionserver.onrender.com/api/table", {
  //     col: selectedSheet?.col?.key,
  //     row: selectedSheet?.row?.key,
  //     text: selectedSheet?.text?.key,
  //   })
  //   .then((res) => {
  //     const data = parseWithNaN(res.data);
  //     setTableData(data);
  //     console.log("Parsed data:", data);
  //     console.log(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // =============================================================================

  useEffect(() => {
    setSelectedSheet(sheets.find((s) => s.name === sheetParam));
    // const sheet = sheets.find((s) => s.name === sheetParam);
    // console.log(sheet);
    // if (!isEmpty(sheet.workbooks)) {
    //   const wb = sheet.workbooks[0].workbook;
    //   setSelectedSheet((prev) => ({ ...prev, workbooks: sheet.workbooks }));
    //   setSelectedWB(wb);
    //   setSelectedWBSheet(Object.keys(wb)[0]);
    // } else {
    //   // setSelectedWB(null);
    //   // setSelectedWBSheet(null);
    // }
  }, [sheets, sheetParam, setSelectedSheet, setSelectedWB, setSelectedWBSheet]);

  //Sorting Fucntions <>
  function handleSorting(e) {
    const tempSheets = sheets.map((s) =>
      s.name === sheetParam
        ? {
            ...s,
            sort: e.target.value,
          }
        : s
    );
    setSheets(tempSheets);
    if (e.target.value === "null") {
      setSortedData({ x: [], y: [] });
    } else {
      axios
        .post("https://python-api-productionserver.onrender.com/api/sort", {
          action: e.target.value,
          col: selectedSheet?.col?.key,
          row: selectedSheet?.row?.key,
        })

        .then((res) => {
          setSortedData({ x: res.data.column, y: res.data.rows });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // test sort api here =================================
    if (e.target.value === "ascending") {
      setSortType("ascending");
      setSort("sort");
    } else {
      setSortType("descending");
      setSort("sort");
    }
    if (e.target.value === "null") {
      setSortType(null);
      setSort(null);
    }
  }

  //To display username and to check token
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    setMatchUser(decoded.Role);
    setLoginUsername(decoded.name);
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      logoutUser();
      // Redirect to login
      window.location.href = "/";
    }
  }
  const getCurrentGraphType = () => {
    const sheet = sheets.find((s) => s.name === sheetParam);
    return sheet ? sheet.graph : null;
  };
  function handleAddRows() {
    const updatedSheet = sheets.find((sheet) => sheet.name === sheetParam);
    var IDElements = document.querySelectorAll(".rows");
    updatedSheet.rows.push(updatedSheet.rows.length);
    for (var i = 0; i < IDElements.length; i++) {
      var r = (IDElements[i].id = "row" + i);
      setROwID(r);
    }
    const tempSheets = sheets.map((sheet) =>
      sheet.name === sheetParam ? updatedSheet : sheet
    );
    console.log(tempSheets);
    setSheets(tempSheets);
    PlotData();
  }
  function handleAddCols() {
    const updatedSheet = sheets.find((sheet) => sheet.name === sheetParam);
    console.log(updatedSheet);
    var IDElements = document.querySelectorAll(".cols");
    updatedSheet.cols.push(updatedSheet.cols.length);
    for (var i = 0; i < IDElements.length; i++) {
      var c = (IDElements[i].id = "col" + i);
      setColID(c);
    }
    const tempSheets = sheets.map((sheet) =>
      sheet.name === sheetParam ? updatedSheet : sheet
    );
    setSheets(tempSheets);
    PlotData();
  }
  console.log(selectedSheet?.rows[0]?.values);
  var z = selectedSheet?.col?.values.map((x) => x);
  console.log(z);
  console.log(selectedSheet, sheets);
  const PlotData = () => {
    const updatedSheet = sheets.find((sheet) => sheet.name === sheetParam);
    const plotData = {
      x: selectedSheet?.rows[0]?.values,
      y: selectedSheet?.cols[0]?.values,
      type: "bar",
    };
    updatedSheet.Plot.push(plotData);
    console.log(plotData);
    setPData(plotData);
    setRowData(plotData.x);
    setColData(plotData.y);

    const tempSheets = sheets.map((sheet) =>
      sheet.name === sheetParam ? updatedSheet : sheet
    );
    setSheets(tempSheets);
  };
  const openModal = (e) => {
    setIsOpen(true);
    if (e.target.value === "if else") {
      setIsOpen(true);
    }
    if (e.target.value === "ELSE") {
      setIsOpe(true);
    }
  };
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Header />
      <Header2 />
      <hr></hr>
      <div className="third-line">
        <div className="field">
          <ImportExcel />
          {!isEmpty(selectedWB) && (
            <div className="fileName" style={{ display: "block" }}>
              {Object.keys(selectedWB).map((sheet, idx) => (
                <div key={idx}>
                  <input
                    type="checkBox"
                    checked={sheet === selectedWBSheet}
                    name="sheetName"
                    value={sheet}
                    onChange={handleSheetChange}
                  ></input>
                  <span
                    draggable
                    onDragStart={() => (dragItem.current = sheet)}
                  >
                    {sheet}
                  </span>
                </div>
              ))}
            </div>
          )}
          <Scrollbars style={{ height: "300px" }}>
            <div
              className="display"
              style={{
                height: "auto",
                fontSize: "15px",
              }}
            >
              {selectedWB && selectedWB[selectedWBSheet] && (
                <div>
                  {selectedWB[selectedWBSheet][0].map((column, idx) => (
                    <div
                      draggable
                      onDragStart={() => (dragItem.current = column)}
                    >
                      {column}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Scrollbars>

          <div className="all3Components">
            <Filter />
            <Condition />
            <select id="sort" onChange={handleSorting}>
              <option value="null">Sort</option>
              <option value="ascending">Ascending</option>
              <option value="descending">Descending</option>
            </select>
            <select id="scope" onChange={(e) => setScopeMap(e.target.value)}>
              <option value="null">Scope/Geo Map</option>
              <option value="usa">USA</option>
              <option value="africa">Africa</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
            </select>
          </div>
          <Granularity drop={handleDrop} deleteValues={deleteValues} />
        </div>
        <div className="graph">
          <div
            droppable
            className="dropzone"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            id="row"
          >
            Row : {selectedSheet?.row?.key}
            <FaTrash
              onClick={deleteValues}
              id="row"
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* ---------------------------------------------- */}
          <div className="">
            {sheets.find((story) => story.name === sheetParam) &&
              selectedSheet?.rows?.map((sheet, index) => (
                <div
                  droppable
                  onDrop={(e) => handleDrop(index)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <button
                    key={index}
                    className="rows"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    id={rowID}
                  >
                    {selectedSheet?.rows[index]?.key}
                  </button>
                  <FaTrash
                    onClick={deleteValues}
                    id={rowID}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            <button onClick={handleAddRows} className="HeaderBtn">
              +
            </button>
            <Plotss />
          </div>
          {/* ---------------------------- */}
          {/* extra row values here*/}
          <br></br>
          <hr style={{ width: "100%", background: "blue" }}></hr>
          <div
            droppable
            className="dropzone"
            onDrop={handleDropCol}
            onDragOver={(e) => e.preventDefault()}
            id="col"
          >
            Column: {selectedSheet?.col?.key}
            <FaTrash
              onClick={deleteValues}
              id="col"
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="">
            {sheets.find((story) => story.name === sheetParam) &&
              selectedSheet?.cols?.map((sheet, index) => (
                <div
                  droppable
                  onDrop={(e) => handleDropCol(index)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <button
                    key={index}
                    className="cols"
                    onDrop={handleDropCol}
                    onDragOver={(e) => e.preventDefault()}
                    id={colID}
                  >
                    {selectedSheet?.cols[index]?.key}
                  </button>
                  <FaTrash
                    onClick={deleteValues}
                    id={rowID}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ))}
            <button onClick={handleAddCols} className="HeaderBtn">
              +
            </button>
          </div>
          <br></br>
          <select className="selectGraph" onChange={selectGraph} id="graph">
            <option value="">Graph</option>
            <option value="line">Line-Graph</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie-Chart</option>
            <option value="donut">Donut Chart</option>
            <option value="box">Box-Chart</option>
            <option value="scatter">Scatter chart</option>
            <option value="funnel">funnel</option>
            <option value="scattermapbox">Map</option>
            <option value="scattergeo">Geo Map</option>
            <option value="table">Table</option>
            <option value="Crosstab">Cross tab</option>
            <option value="treemap">Tree</option>
          </select>
          <input
            value={sheetParam}
            className="sheetName"
            onChange={(e) => setSheetParam(e.target.value)}
          />
          <div
            id="wordCloud"
            style={{
              width: "540px",
              height: "360px",
              display: "none",
              border: " 1px solid black",
              fontColor: "10px",
            }}
          >
            <button
              onClick={wordCloud}
              style={{
                width: "70px",
                height: "30px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              x
            </button>

            {/* <ReactWordcloud words={words} /> */}
          </div>
          <div id="plots">
            {tableData &&
              tableData.headings &&
              tableData.side_headings &&
              tableData.text_values &&
              getCurrentGraphType() === "Crosstab" && (
                <Crosstable
                  headings={tableData.headings}
                  sideHeadings={tableData.side_headings}
                  textValues={tableData.text_values.map((row) =>
                    row.map((value) =>
                      value === null ? "-" : value.toFixed(2)
                    )
                  )}
                />
              )}

            {selectedSheet?.graph &&
              selectedSheet?.Plot &&
              selectedSheet?.rows &&
              getCurrentGraphType() !== "Crosstab" &&
              sheets.find((story) => story.name === sheetParam) &&
              selectedSheet?.cols?.map((sheet, index) => (
                <Plot
                  data={[
                    selectedSheet.graph === "pie"
                      ? {
                          type: selectedSheet?.graph,
                          values: selectedSheet?.row?.values,
                          labels: selectedSheet?.col?.values,
                        }
                      : selectedSheet.graph === "donut"
                      ? {
                          type: "pie",
                          values: selectedSheet?.row?.values,
                          labels: selectedSheet?.col?.values,
                          hole: 0.4,
                        }
                      : selectedSheet.graph === "box"
                      ? {
                          type: selectedSheet?.graph,
                          x: selectedSheet?.col?.values,
                          y: selectedSheet?.row?.values,
                          transforms: [
                            {
                              type: "groupby",
                              groups: selectedSheet?.groupby?.values,
                            },
                            {
                              type: filterType,
                              target: "y",
                              operation: filterOperator,
                              value: filterValue,
                            },
                          ],
                        }
                      : selectedSheet.graph === "funnel"
                      ? {
                          type: selectedSheet?.graph,
                          y: selectedSheet?.col?.values,
                          x: selectedSheet?.row?.values,
                          hoverinfo: "x+percent previous+percent initial",
                          transforms: [
                            {
                              type: "aggregate",
                              aggregations: [
                                {
                                  target: "x",
                                  func: "sum",
                                },
                              ],
                            },
                            {
                              type: "groupby",
                              groups: selectedSheet?.groupby?.values,
                            },
                            {
                              type: "sort",
                              target: selectedSheet?.row?.values,
                              order: "descending",
                            },
                          ],
                        }
                      : selectedSheet.graph === "scatter"
                      ? {
                          type: selectedSheet?.graph,
                          x: selectedSheet?.col?.values,
                          y: selectedSheet?.row?.values,
                          mode: "markers", //only for the mode scatter has to be written in a diffrent object.
                          transforms: [
                            {
                              type: "aggregate",
                              aggregations: [
                                {
                                  target: "y",
                                  func: "sum",
                                },
                              ],
                            },
                            {
                              type: filterType,
                              target: "y",
                              operation: filterOperator,
                              value: filterValue,
                            },

                            {
                              type: "groupby",
                              groups: selectedSheet?.groupby?.values,
                            },
                          ],
                        }
                      : selectedSheet.graph === "table"
                      ? {
                          type: selectedSheet?.graph,
                          columnorder: [1, 9],
                          columnwidth: [40, 40],
                          header: {
                            values: [
                              selectedSheet?.col?.key,
                              selectedSheet?.row?.key,
                            ],
                            align: "center",
                            font: {
                              family: "Roboto",
                              size: 15,
                              color: "Black",
                            },
                          },
                          cells: {
                            values: [
                              selectedSheet?.col?.values,
                              selectedSheet?.row?.values,
                            ],
                            height: 20,
                            font: {
                              family: "Roboto",
                              size: 13,
                              color: "Black",
                            },
                          },
                        }
                      : selectedSheet.graph === "scattermapbox"
                      ? {
                          type: selectedSheet?.graph,
                          // lon: [78.3728344],
                          // lat: [17.4563197],
                          lon: selectedSheet?.col?.values,
                          lat: selectedSheet?.row?.values,
                          mode: "markers",
                          marker: {
                            size: 12,
                          },
                          text: selectedSheet?.text?.values,
                          transforms: [
                            {
                              type: "groupby",
                              groups: selectedSheet?.groupby?.values,
                            },
                          ],
                        }
                      : selectedSheet.graph === "scattergeo"
                      ? {
                          type: selectedSheet?.graph,
                          lon: selectedSheet?.col?.values,
                          lat: selectedSheet?.row?.values,
                          locationmode: {
                            enumerated:
                              "ISO-3" |
                              "Saudi Arabia" |
                              "USA-states" |
                              "country names",
                          },
                          default: "ISO-3",
                          mode: "markers",
                          marker: {
                            size: 12,
                          },
                          text: selectedSheet?.text?.values,
                          transforms: [
                            {
                              type: "groupby",
                              groups: selectedSheet?.groupby?.values,
                            },
                          ],
                        }
                      : selectedSheet.graph === "treemap"
                      ? {
                          type: "treemap",
                          labels: selectedSheet?.row?.values,
                          parents: selectedSheet?.col?.values,
                        }
                      : // alculation here
                        {
                          x: selectedSheet?.cols[0]?.values,
                          y: selectedSheet?.rows[0]?.values,
                          xaxis: "x",
                          type: "bar",
                          // text: selectedSheet?.col?.values,
                          transforms: [
                            {
                              type: "aggregate",
                              aggregations: [
                                {
                                  target: "y",
                                  func: "sum",
                                  enabled: true,
                                },
                              ],
                            },

                            {
                              type: filterType,
                              target: "y",
                              operation: filterOperator,
                              value: filterValue,
                            },
                            {
                              type: sort,
                              target: selectedSheet?.row?.values,
                              order: sortType,
                            },
                            {
                              type: "groupby",
                              groups: selectedSheet?.groupby?.values,
                              styles: [{}],
                            },
                          ],
                        },
                    {
                      x: z,
                      y: "",
                      xaxis: "",
                      yaxis: "",
                      type: "",
                      // text: selectedSheet?.col?.values,
                    },
                    {
                      x: z,
                      y: "",
                      xaxis: "",
                      yaxis: "",
                      type: "",
                      // text: selectedSheet?.col?.values,
                    },
                    {
                      x: z,
                      y: "",
                      xaxis: "",
                      yaxis: "",
                      type: "",
                      // text: selectedSheet?.col?.values,
                    },
                  ]}
                  layout={{
                    // autosize: false,
                    xaxis: { title: { text: "subCategory" } },
                    yaxis: { title: { text: selectedSheet?.rows[index]?.key } },
                    // yaxis2: {
                    //   title: { text: selectedSheet?.rows[1]?.key },
                    //   position: 1,
                    // },
                    // xaxis2: {
                    //   title: {
                    //     text: "x2",
                    //   },
                    //   automargin: 1,
                    //   position: 0.5,
                    // },
                    // yaxis2: {
                    //   title: { text: selectedSheet?.rows[1]?.key },
                    //   position: 1,
                    // },
                    // xaxis3: {
                    //   title: { text: selectedSheet?.cols[0]?.key },
                    //   position: 0.7,
                    //   exponentformat: "E",
                    // },
                    width: 840,
                    height: 420,
                    fontSize: 2,
                    mapbox: { style: "open-street-map" },
                    barmode: "relative",
                    hovermode: "closest",
                    grid: {
                      rows: 1,
                      columns: 1,
                      pattern: "dependent",
                      roworder: "bottom to top",
                    },
                    geo: {
                      scope: scopemap,
                      showlakes: true,
                      lakecolor: "rgb(255,255,255)",
                    },

                    updatemenus: [
                      {
                        x: 0.85,
                        y: 1.05,
                        showactive: true,
                        buttons: [
                          {
                            method: "restyle",
                            args: ["transforms[0].aggregations[0].func", "sum"],
                            label: "Sum",
                          },
                          {
                            method: "restyle",
                            args: ["transforms[0].aggregations[0].func", "avg"],
                            label: "Avg",
                          },
                          {
                            method: "restyle",
                            args: ["transforms[0].aggregations[0].func", "min"],
                            label: "Min",
                          },
                          {
                            method: "restyle",
                            args: ["transforms[0].aggregations[0].func", "max"],
                            label: "Max",
                          },
                          {
                            method: "restyle",
                            args: [
                              "transforms[0].aggregations[0].func",
                              "mode",
                            ],
                            label: "Mode",
                          },
                          {
                            method: "restyle",
                            args: [
                              "transforms[0].aggregations[0].func",
                              "median",
                            ],
                            label: "Median",
                          },
                          {
                            method: "restyle",
                            args: [
                              "transforms[0].aggregations[0].func",
                              "count",
                            ],
                            label: "Count",
                          },
                          {
                            method: "restyle",
                            args: [
                              "transforms[0].aggregations[0].func",
                              "stddev",
                            ],
                            label: "Std.Dev",
                          },
                          {
                            method: "restyle",
                            args: [
                              "transforms[0].aggregations[0].func",
                              "first",
                            ],
                            label: "First",
                          },
                          {
                            method: "restyle",
                            args: [
                              "transforms[0].aggregations[0].func",
                              "last",
                            ],
                            label: "Last",
                          },
                        ],
                      },
                    ],
                  }}
                />
              ))}
          </div>
        </div>
      </div>
      {/* Renaming sheet Box */}
      <Menu showMenu={showMenu} />
      <Footer />
    </>
  );
};
// Sheet.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
// };

export default Sheet;
