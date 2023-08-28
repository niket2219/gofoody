import UseContext from "./UseContext";
import React, { useState, useEffect } from "react";

const UseState = (props) => {
  const [loginstate, setloginstate] = useState({
    login: false,
    username: "",
  });

  const [orders, setorders] = useState([]);

  const [foodQuant, setfoodQuant] = useState(0);
  const [foodPrice, setfoodPrice] = useState(0);
  const [payable, setpayable] = useState(0);

  const [buyitem, setbuyitem] = useState({
    foodname: "",
    foodurl: "",
    foodprice: 0,
    foodquantity: 0,
    total: 0,
  });

  return (
    <UseContext.Provider
      value={{
        loginstate,
        setloginstate,
        buyitem,
        setbuyitem,
        foodQuant,
        setfoodQuant,
        foodPrice,
        setfoodPrice,
        orders,
        setorders,
        payable,
        setpayable,
      }}
    >
      {props.children}
    </UseContext.Provider>
  );
};

export default UseState;
