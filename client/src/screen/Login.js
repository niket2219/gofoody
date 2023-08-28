import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const res = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const result = await res.json();
    // console.log(result);

    if (!result.login) {
      toast.error("Invalid Credentials !", {
        position: toast.POSITION.TOP_CENTER,
        theme: "colored",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Loginned Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      localStorage.setItem("authToken", result.authToken);
      localStorage.setItem("username", result.userdata.email);
      localStorage.setItem("user", result.userdata.name);

      navigate("/");
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="my-1">
              Email address
            </label>
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
            <label htmlFor="exampleInputPassword1" className="my-2">
              Password
            </label>
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

          <button type="submit" className="btn btn-primary m-2">
            Submit
          </button>
          <Link to="/createuser">
            <button type="submit" className="btn btn-danger m-2">
              New User
            </button>
          </Link>
        </form>
        <ToastContainer autoClose={2000} transition={Zoom} />
      </div>
    </>
  );
}

export default Login;
