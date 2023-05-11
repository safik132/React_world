import React from "react";
import axios from "axios";

export const postFormData = (newData) => {
  axios
    .post("http://localhost:8000/ml/data/", newData)
    .then((res) => console.log(res));
};
