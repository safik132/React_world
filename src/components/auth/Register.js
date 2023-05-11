import React, { useContext, useState } from "react";
import { GlobalContext } from "../../GlobalProvider";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

const Register = (userData) => {
  const { form, setForm, error, setError } = useContext(GlobalContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser({
      ...user,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      password2: user.password2,
      Role: user.Role,
    };
    registerUser(newUser);
    if (alert) {
      setUser({
        name: "",
        email: "",
        password: "",
        password2: "",
        Role: "",
      });
    }
  };
  // const { errors } = user.errors;
  return (
    <>
      <div className="LoginPage">
        <p
          style={{
            width: "10%",
            height: "3px",
            marginLeft: "-490px",
            marginBottom: "20px",
            border: "1px solid black",
            backgroundColor: "black",
          }}
        ></p>
        <div className="" style={{ paddingLeft: "11.250px" }}>
          <h4 style={{ marginLeft: "-290px" }}>
            <b>Register</b> Below
          </h4>
        </div>
        <form className="LoginForm" onSubmit={handleSubmit}>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.name}
            id="name"
            type="name"
            placeholder="Name"
            required
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.email}
            id="email"
            type="email"
            placeholder="Email"
            required
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.password}
            id="password"
            required
            type="password"
            placeholder="Password"
          />
          <br></br>
          <input
            className="formInput"
            onChange={handleChange}
            value={user.password2}
            id="password2"
            // error={errors.password}
            type="password"
            placeholder="Confirm Password"
            required
          />
          <br></br>
          <select
            className="formInput"
            style={{ fontSize: "15px", padding: "0px" }}
            onChange={handleChange}
            id="Role"
          >
            <option value="">Role</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>

          <br></br>
          <p>
            {error && (
              <>
                <small>{error}</small>
              </>
            )}
          </p>
          <div style={{ display: "flex", cursor: "pointer" }}>
            <p className="text_tag">
              Already have an account? <br></br>
              <button
                value="login"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#5d6d7e",
                  border: "3px solid black",
                  borderRadius: "3px",
                  fontSize: "10px",
                  padding: "3px",
                }}
                onClick={(e) => setForm(e.target.value)}
              >
                login
              </button>
            </p>
            <button className="formBtn">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
