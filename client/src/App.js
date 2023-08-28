import React from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screen/Login";
import Home from "./screen/Home";
import Signup from "./screen/Signup";
import UseState from "./components/ContextState";
import Buy from "./screen/Buy";
import OrderPage from "./screen/OrderPage";
import Checkout from "./screen/Checkout";

function App() {
  return (
    <UseState>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/purchase" element={<Buy />} />
          <Route exact path="/orderpage" element={<OrderPage />} />
          <Route exact path="/order/payment" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </UseState>
  );
}

export default App;
