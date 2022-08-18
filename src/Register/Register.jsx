import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });

  const getUserInfo = (e) => {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  };

  const submitUser = async (e) => {
    e.preventDefault();
    setErrorList([]);
    setError("");
    setIsLoading(true);
    let validationResult = validateForm();
    if (validationResult.error) {
      setErrorList(validationResult.error.details);
      setIsLoading(false);
    } else {
      let { data } = await axios.post(
        "https://route-egypt-api.herokuapp.com/signup",
        user
      );
      if (data.message === "success") {
        setError("");
        navigate("/login");
      } else {
        setError(data.message);
      }
      setIsLoading(false);
    }
  };

  function validateForm() {
    const scheme = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(10).required(),
      last_name: Joi.string().alphanum().min(3).max(10).required(),
      age: Joi.number().min(16).max(60).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string().pattern(new RegExp("[A-Za-z0-9_]{3,}")).required(),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <div className="w-75 mx-auto">
      <h2 className="my-4">Register</h2>
      {errorList
        ? errorList.map((err, errIndex) => (
            <div key={errIndex} className="alert alert-danger">
              {err.message}
            </div>
          ))
        : null}
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <form onSubmit={submitUser}>
        <div className="form-group mb-3">
          <label htmlFor="first_name">First Name :</label>
          <input
            className="form-control"
            type="text"
            id="first_name"
            name="first_name"
            onChange={getUserInfo}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="last_name">Last Name :</label>
          <input
            className="form-control"
            type="text"
            id="last_name"
            name="last_name"
            onChange={getUserInfo}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Age :</label>
          <input
            className="form-control"
            type="text"
            id="age"
            name="age"
            onChange={getUserInfo}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email :</label>
          <input
            className="form-control"
            type="text"
            id="email"
            name="email"
            onChange={getUserInfo}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password :</label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            onChange={getUserInfo}
          />
        </div>
        <button
          type="submit"
          className="btn btn-info d-block ms-auto py-2 px-4"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </div>
  );
}
