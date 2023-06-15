import React, { useContext, useParams, useState } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import { GlobalContext } from "../GlobalProvider";

const ActionProvider = ({
  createChatBotMessage,
  setState,
  children,
  props,
}) => {
  const {
    loginUsername,
    selectedSheet,
    sheets,
    setSheets,
    selectedWB,
    selectedWBSheet,
    columns,
  } = useContext(GlobalContext);
  const [x, setx] = useState();
  //   const sheetParam = useParams();
  const handleHello = () => {
    const botMessage = createChatBotMessage(
      `Hi,${loginUsername} how can I help you?`
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const options = [
    {
      text: "bar",
      id: 1,
    },
    {
      text: "line",
      id: 2,
    },
    { text: "pie", id: 3 },
    { text: "donut", id: 4 },
    { text: "funnel", id: 5 },
  ];
  const selectGraph = (e) => {
    const tempSheets = sheets.map((s) =>
      s.name === "sheet"
        ? {
            ...s,
            graph: e.target.value,
          }
        : s
    );
    setSheets(tempSheets);
  };

  const handlePlot = () => {
    const botMessage = createChatBotMessage(
      options.map((x) => (
        <button
          key={options.id}
          value={x.text}
          onClick={selectGraph}
          style={{ cursor: "pointer" }}
        >
          {x.text}
        </button>
      ))
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
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
  const handleColValue = (event) => {
    const botMessage = createChatBotMessage("Select Col Values");

    const botMessages = createChatBotMessage(
      columns.map((x) => (
        <button
          value={x}
          onClick={giveColValue}
          style={{
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "2px",
            fontSize: "13px",
            padding: "3px",
            margin: "3px",
          }}
          id="col"
        >
          {x}
        </button>
      ))
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessages],
    }));
  };
  const handleRowValue = (event) => {
    const botMessage = createChatBotMessage("Select Row Values");

    const botMessages = createChatBotMessage(
      columns.map((x) => (
        <button
          value={x}
          onClick={giveRowValue}
          style={{
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "2px",
            fontSize: "13px",
            padding: "3px",
            margin: "3px",
          }}
          id="col"
        >
          {x}
        </button>
      ))
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage, botMessages],
    }));
  };
  const giveColValue = (e) => {
    const dragValue = e.target.value;
    // const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dragValue]
    );
    const tempSheets = sheets.map((s) =>
      s.name === "sheet"
        ? { ...s, ["col"]: { key: dragValue, values: plotValue } }
        : s
    );
    setSheets(tempSheets);
  };
  const giveRowValue = (e) => {
    const dragValue = e.target.value;
    // const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dragValue]
    );
    const tempSheets = sheets.map((s) =>
      s.name === "sheet"
        ? { ...s, ["row"]: { key: dragValue, values: plotValue } }
        : s
    );
    setSheets(tempSheets);
  };

  const errors = () => {
    const botMessage = createChatBotMessage("Please Upload the File");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const closeBot = () => {};
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handlePlot,
            handleRowValue,
            handleColValue,
            closeBot,
            errors,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
