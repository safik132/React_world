import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setAuthenticated, SET_CURRENT_USER, USER_LOADING } from "./types";
import { GlobalContext } from "../../GlobalProvider";
import Sheet from "../Sheet/Sheet";
export const registerUser = (userData, history) => {
  console.log("yes", history);
  axios
    // .post("http://localhost:5001/api/users/register", userData)
    .post(
      "http://18.206.247.176:5001/api/users/register",
      userData
    )
    .then((res) => alert("Registered Successfull pls Login"))
    .catch((err) => console.log(err));
};
//to get user token
// export const loginUser = (userData, props) => {
//   axios
//     // .post("https://ocean-4-1-userserver.onrender.com/api/users/login", userData)
//     .post(
//       "https://ocean-user-serverbackend.onrender.com/api/users/login",
//       userData
//     )
//     .then((res) => {
//       const { token } = res.data;
//       const { navigate } = useNavigate();
//       localStorage.setItem("jwtToken", token);
//       setAuthToken(token);
//       const decoded = jwt_decode(token);
//       setCurrentUser(decoded);
//       console.log("sasa");
//       navigate("/sheet/sheet");
//     })
//     .catch((err) => {
//       alert("Email or password invalid");
//     });
// };

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};
export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  setCurrentUser({});
};
