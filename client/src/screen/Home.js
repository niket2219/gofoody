import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../App.css";

function Home() {
  const [food_items, setfood_items] = useState([]);
  const [food_cat, setfood_cat] = useState([]);
  const [search, setsearch] = useState("");

  const fetch_food = async () => {
    const res = await fetch("http://localhost:5000/api/fetchfood", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    // console.log(result);
    setfood_cat(result[1]);
    setfood_items(result[0]);
  };

  useEffect(() => {
    fetch_food();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <div>
        <div className="jumbotron my-2">
          <h4 className="display-6 welcm ">
            Welcome{" "}
            {localStorage.getItem("user") == null
              ? ""
              : localStorage.getItem("user").toUpperCase()}
          </h4>

          <hr className="my-4" />
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        {food_cat === []
          ? "........"
          : food_cat.map((e, i) => {
              return (
                <div className="container row mb-3">
                  <div className="container m-3 fs-3 fw-bolder" key={e._id}>
                    {e.CategoryName}
                  </div>
                  <hr></hr>
                  <div className="row">
                    {food_items === []
                      ? "...no items found"
                      : food_items
                          .filter(
                            (items) =>
                              items.CategoryName === e.CategoryName &&
                              items.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                          )
                          .map((item, i) => {
                            return (
                              <div className="col-12 col-md-4 col-lg-3 my-2">
                                <Card
                                  key={i}
                                  foodItem={item}
                                  url={item.img}
                                  Options={item.options[0]}
                                  name={item.name}
                                  desc={item.description}
                                />
                              </div>
                            );
                          })}
                  </div>
                </div>
              );
            })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
