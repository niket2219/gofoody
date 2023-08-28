import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UseContext from "../components/UseContext";
import "../App.css";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

function Buy() {
  const cxt = useContext(UseContext);
  const { buyitem, setbuyitem, orders, setorders, payable, setpayable } = cxt;

  const updatepayable = () => {
    localStorage.setItem(
      "payable",
      JSON.parse(localStorage.getItem("payable")) +
        JSON.parse(sessionStorage.getItem("desc")).total
    );
  };

  const addToCart = () => {
    const newOrder = JSON.parse(sessionStorage.getItem("desc"));

    if (newOrder.total > 0) {
      if (localStorage.getItem("authToken") == null) {
        Swal.fire({
          title: "Error",
          text: "Login Or Register To Continue",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        if (!localStorage.getItem("orders")) {
          const oldOrders = [];
          oldOrders.push(newOrder);

          localStorage.setItem("orders", JSON.stringify(oldOrders));
          // console.log(JSON.parse(localStorage.getItem("orders")));
        } else {
          let prevOrders = JSON.parse(localStorage.getItem("orders"));
          const containsOrder = prevOrders.some((object) => {
            return object.foodname == newOrder.foodname;
          });
          if (!containsOrder) {
            // console.log(containsOrder);
            localStorage.setItem(
              "orders",
              JSON.stringify(prevOrders.concat(newOrder))
            );
            updatepayable();
            // console.log(prevOrders);
          } else {
            Swal.fire({
              title: "Warning",
              text: "Item already exists in Cart",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        }
      }
    } else {
      Swal.fire({
        title: "Warning",
        text: "Cannot add the required items to cart",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="container">
      <div>
        <Navbar />
      </div>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="card m-3" style={{ maxWidth: "840px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={
                  buyitem.foodurl == ""
                    ? JSON.parse(sessionStorage.getItem("desc")).foodurl
                    : buyitem.foodurl
                }
                className="img-fluid rounded-start"
                alt="image not loaded"
                style={{ height: "454px", width: "320px" }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1
                  className="card-title d-flex align-items-center justify-content-center fw-semibold mb-3"
                  style={{ color: "white" }}
                >
                  {buyitem.foodname == ""
                    ? JSON.parse(sessionStorage.getItem("desc")).foodname
                    : buyitem.foodname}
                </h1>
                <h5 className="card-text fw-bolder lh-lg my-3 mx-2">
                  {buyitem.foodname == ""
                    ? JSON.parse(sessionStorage.getItem("desc")).foodDesc
                    : buyitem.foodDesc}
                </h5>
                <p className="card-text">
                  <small className="text-body-secondary">
                    Last updated 3 mins ago
                  </small>
                </p>
                <div className="mx-3 my-5">
                  <button type="button" className="btn btn-lg btn-primary">
                    Amount
                    <span className="badge text-bg-secondary mx-2">
                      {buyitem.total == ""
                        ? JSON.parse(sessionStorage.getItem("desc")).total
                        : buyitem.total}{" "}
                    </span>
                  </button>
                </div>

                <div className="mx-3">
                  <button
                    type="button"
                    className="btn btn-success m-2"
                    onClick={() => {
                      addToCart();
                    }}
                  >
                    Add Cart
                  </button>
                  <Link to="/orderpage">
                    <button
                      type="button"
                      className="btn btn-success m-2"
                      onClick={() => {
                        addToCart();
                      }}
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
