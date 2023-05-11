import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setAuthenticated, SET_CURRENT_USER, USER_LOADING } from "./types";
import { GlobalContext } from "../../GlobalProvider";
export const registerUser = (userData, history) => {
  console.log("yes", history);
  axios
    .post(
      "https://ocean-4-1-userserver.onrender.com/api/users/register",
      userData
    )
    .then((res) => alert("Registered Successfull pls Login"))
    .catch((err) => console.log(err));
};
//to get user token
export const loginUser = (userData, props) => {
  console.log(props);
  axios
    .post("https://ocean-4-1-userserver.onrender.com/api/users/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      setCurrentUser(decoded);
      setAuthenticated(true);
    })

    .catch((err) => {
      alert("Email or password invalid");
    });
};

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
