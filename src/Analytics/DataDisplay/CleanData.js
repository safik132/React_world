import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";

const CleanData = () => {
  const {
    selectedWB,
    selectedWBSheet,
    selectedSheet,
    numberofColumns,
    numberofRows,
    setSelectedWBSheet,
    setSelectedWB,
  } = useContext(GlobalContext);
  return (
    <>
      <h1>Clean Data</h1>
      <div></div>
    </>
  );
};
export default CleanData;
