import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, location } = credentials;
    const res = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        location,
      }),
    });
    const result = await res.json();
    if (!result) {
      window.alert("invalid credentials");
    } else {
      window.alert("registration successfull");
      // console.log("registration successfull");
      navigate("/login");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group m-2">
          <label htmlFor="exampleInputName">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName"
            placeholder="Name"
            name="name"
            value={credentials.name}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control m-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group m-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <div className="form-group m-2">
          <label htmlFor="exampleInputPassword1">Address</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Address"
            name="location"
            value={credentials.location}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary m-2">
          Submit
        </button>
        <Link to="/login">
          <button type="submit" className="btn btn-danger m-2">
            Already user
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Signup;
