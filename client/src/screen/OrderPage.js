import React from "react";
import "../index.css";
import Orders from "../components/Orders";
import "../App.css";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

function OrderPage() {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("orders"));

  const remove = (item) => {
    const orders = JSON.parse(localStorage.getItem("orders"));
    const newOrders = orders.filter((e) => {
      return e.foodname != item.foodname;
    });
    // console.log(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
    const newPayable = JSON.parse(localStorage.getItem("payable")) - item.total;
    localStorage.setItem("payable", JSON.stringify(newPayable));
    window.location.reload(true);
  };

  const cnfrmOrder = async (element) => {
    // console.log("order placed");

    try {
      const { foodname, foodurl, foodquantity, total } = element;
      const email = localStorage.getItem("username");
      const res = await fetch("http://localhost:5000/api/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          foodname,
          quantity: foodquantity,
          totalprice: total,
          img: foodurl,
        }),
      });

      const result = await res.json();
      // console.log(result);
    } catch (error) {
      // console.log(error);
    }
  };

  const orderNow = () => {
    const orderItems = JSON.parse(localStorage.getItem("orders"));
    orderItems.forEach(cnfrmOrder);
    // console.log("Ordered successfully");
    Swal.fire({
      title: "Success",
      text: "Food Items Ordered successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
    navigate("/");
    localStorage.removeItem("orders");
    localStorage.removeItem("payable");
    sessionStorage.removeItem("desc");
  };

  const paymentVerification = async (response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      response;

    const res = await fetch("http://localhost:5000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      }),
    });

    const result = await res.json();
    // console.log(result);

    if (result.code == 202) {
      orderNow();
    }
  };

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_KuZJa7QKoLO4Xr",
      amount: data.amount,
      currency: data.currency,
      name: "niket food",
      order_id: data.id,

      handler: function (response) {
        // console.log(response, "200");
        paymentVerification(response);
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (amount) => {
    if (amount == 0) {
      Swal.fire({
        title: "Warning",
        text: "No Food Items Found in the Cart",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });
      const result = await res.json();
      // console.log(result);
      handleOpenRazorpay(result.data);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <link
        to="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container mb-3">
        <Navbar />
      </div>
      <div className="container">
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{ width: "50%" }}>Product</th>
              <th style={{ width: "10%" }}>Price</th>
              <th style={{ width: "8%" }}>Quantity</th>
              <th style={{ width: "22%" }} className="text-center">
                Subtotal
              </th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>

          <tbody>
            {data === []
              ? "Cart is Empty"
              : data &&
                data.map((e, i) => {
                  return <Orders key={i} item={e} remove={remove} />;
                })}
          </tbody>

          <tfoot>
            <tr className="visible-xs">
              <td className="text-center">
                <strong>
                  Total ₹{" "}
                  {localStorage.getItem("payable") > 0
                    ? localStorage.getItem("payable")
                    : 0}
                </strong>
              </td>
            </tr>
            <tr>
              <td>
                <Link to="/" className="btn btn-warning">
                  <i className="fa fa-angle-left"></i> Continue Shopping
                </Link>
              </td>
              <td colSpan="2" className="hidden-xs"></td>
              <td className="hidden-xs text-center">
                <strong>
                  Total ₹{" "}
                  {localStorage.getItem("payable") > 0
                    ? localStorage.getItem("payable")
                    : 0}
                </strong>
              </td>
              <td>
                <Link
                  className="btn btn-success btn-block"
                  onClick={() => {
                    handlePayment(localStorage.getItem("payable"));
                  }}
                >
                  Checkout <i className="fa fa-angle-right"></i>
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default OrderPage;
