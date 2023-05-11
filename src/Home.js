import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
import "./App.css";
// import Login from "./Login";
import Login from "./components/auth/Logins";
import Register from "./components/auth/Register";

const Home = () => {
  const { form, setForm } = useContext(GlobalContext);
  const navigate = useNavigate();
  async function directHandler(event) {
    event.preventDefault();
    navigate("./Sheet/sheet", { replace: true });
  }

  return (
    <>
      <div className="home-page">
        <div className="leftSide">
          <h1 className="h1">Project Ocean </h1>
          <a href="https://www.aces-co.com/" rel="noreferrer" target="_blank">
            <img
              className="logo"
              style={{ color: "white" }}
              src="../images/Aces.png"
              alt="logo-img"
            />
          </a>
        </div>
        <div className="rightSide">
          {/* <Login /> */}
          {form === "register" ? <Register /> : <Login />}
        </div>
      </div>
    </>
  );
};

export default Home;
