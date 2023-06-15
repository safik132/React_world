import React, { useContext, CSSProperties } from "react";
import { GlobalContext } from "../../GlobalProvider";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";

const Bufferingwindow = () => {
  const { loading, bufferingModal, fileName } = useContext(GlobalContext);

  const closeBufferingModal = () => {};

  const styleLoader: CSSProperties = {
    display: "block",
    margin: "30px auto",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black #5d6d7e",
    borderRadius: "100%",
    border: "10px solid black",
    color: "black",
  };
  return (
    <>
      <Modal
        isOpen={bufferingModal}
        className="bufferingModalStyle"
        onRequestClose={closeBufferingModal}
        ariaHideApp={false}
      >
        <div
          className=""
          style={{
            fontSize: "15px",
            display: "block",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4
            className=""
            style={{
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Importing Data from {fileName}
          </h4>
          <br></br>
          <h4
            className=""
            style={{
              fontSize: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Please wait...
          </h4>
        </div>

        <ClipLoader
          loading={loading}
          size={60}
          color="black"
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={styleLoader}
        />
      </Modal>
    </>
  );
};
export default Bufferingwindow;
