import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseContext from "./UseContext";

function Card(props) {
  const cxt = useContext(UseContext);
  const {
    buyitem,
    setbuyitem,
    foodQuant,
    setfoodQuant,
    foodPrice,
    setfoodPrice,
  } = cxt;

  const options = props.Options;
  const foodOptions = Object.keys(options);

  const buyFood = () => {
    const desc = {
      foodname: props.name,
      foodurl: props.url,
      foodprice: foodPrice,
      foodquantity: foodQuant,
      foodDesc: props.desc,
      total: foodPrice * foodQuant,
    };

    sessionStorage.setItem("desc", JSON.stringify(desc));
    setbuyitem({
      foodname: props.name,
      foodurl: props.url,
      foodprice: foodPrice,
      foodquantity: foodQuant,
      foodDesc: props.desc,
      total: foodPrice * foodQuant,
    });
  };

  return (
    <div>
      <div className="card" style={{ width: "15rem" }}>
        <img
          src={props.url}
          className="card-img-top"
          alt={props.url}
          style={{ width: "238px", height: "130px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => {
                setfoodQuant(e.target.value);
                // console.log(foodQuant);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-warning rounded"
              onChange={(e) => {
                const catg = e.target.value;
                const price = options[catg];
                // console.log(price);
                setfoodPrice(price);
              }}
            >
              {foodOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">Total Price </div>
          </div>
          <hr></hr>
          <div>
            <Link to="/purchase">
              <button
                type="button"
                className="btn btn-info"
                // onClick={handleAddItems}
                // disabled={localStorage.getItem("authToken") ? false : true}
                onClick={buyFood}
              >
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
