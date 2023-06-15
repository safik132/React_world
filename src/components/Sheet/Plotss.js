import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalProvider";
import Modal from "react-modal";

const Plotss = () => {
  const { setIsOpe, modalIsOpen, setIsOpen, setRowLength } =
    useContext(GlobalContext);
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
      <button onClick={openModal} className="HeaderBtn">
        rows
      </button>
      <Modal
        isOpen={modalIsOpen}
        className="modalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <h1>Plot Changes</h1>
        <br></br>
        <p>
          number of Rows:
          <input type="number" />
        </p>
        <br></br>
        <p>
          x axis
          <input type="text" />
        </p>
        <br></br>
        <p>
          y axis
          <input type="text" />
        </p>
        <br></br>
        <button className="HeaderBtn">Submit</button>
      </Modal>
    </>
  );
};
export default Plotss;
