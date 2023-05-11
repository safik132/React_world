import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { useNavigate } from "react-router-dom";
import { logoutUser, setCurrentUser } from "../actions/authActions";
import XlsExport from "xlsexport";

const Header2 = () => {
  const { loginUsername, matchedUser } = useContext(GlobalContext);
  const [profileDisplay, setProfileDisplay] = useState("");

  let navigate = useNavigate();

  // Navigate to Home Page
  async function homehandler(event) {
    event.preventDefault();
    navigate("/", { replace: true });
  }
  //To handle user logout
  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate("/", { replace: true });
  };
  // excel file download contains lat and lon of user
  var lon = [];
  var lat = [];
  var timestamp = [];
  const successCallback = (position) => {
    lon.push(position.coords.longitude);
    lat.push(position.coords.latitude);
    timestamp.push(position.timestamp);
    // console.log(lon, lat);
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  const downloadFile = () => {
    const dataSample = lon.map((valuelon, index) => {
      return {
        longitude: valuelon,
        latitude: lat[index],
        time: new Date(timestamp[index]),
      };
    });

    const xls = new XlsExport(dataSample, "Download");
    xls.exportToXLS();
  };

  return (
    <>
      <div className="Second-line">
        <h3
          className="HeaderBtn"
          style={{ padding: "8px" }}
          onClick={homehandler}
        >
          Home
        </h3>
        <button onClick={downloadFile} className="HeaderBtn">
          Download Excel
        </button>
        <button onClick={handleLogout} className="HeaderBtn">
          Logout
        </button>
        <p style={{ marginLeft: "120px", padding: "8px" }}>
          Welcome {loginUsername}
        </p>
        <p
          style={{
            marginLeft: "730px",
            marginTop: "10px",
            border: "2px solid black",
            fontSize: "16px",
            padding: "5px",
          }}
          className="HeaderBtn"
        >{`${matchedUser} user`}</p>

        {/* <div
          className="profile"
          style={{
            display: "Flex",
            AlignContent: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="profileContent"
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
            style={{ position: "relative", padding: "0 80px" }}
          >
            profile
          </button>
        </div>

        <div>
          <h1 id="myDiv" style={{ display: "none" }}>
            this data!
          </h1>
        </div> */}
      </div>
    </>
  );
};
export default Header2;
