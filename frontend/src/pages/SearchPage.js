import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link, useLocation } from "react-router-dom";
import '../styles/home.css'

const SearchPage = () => {

  const query = new URLSearchParams(useLocation().search).get('q') || ""; //useLocation.search -> ?q=burger

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`http://127.0.0.1:8000/api/foods_search/?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
        });
    }
  }, [query]);
  
  return (
    <PublicLayout>
      <div className="container py-4">
        <h3 className="text-primary text-center">Results for: "{query}"</h3>
        <div className="row mt-4">
          {foods.length === 0 ? (
            <p className="text-center">No Foods Found</p>
          ) : (
            foods.map((food) => (
          <div key={food.id} className="col-md-4 mb-4">
            <div className="card hovereffect">
                  <img src={`http://127.0.0.1:8000${food.image}`} className="card-img-top" alt={food.item_name} style={{height:"180px"}}/>
              <div className="card-body">
                <h5 className="card-title">
                      <Link to="#">{food.item_name}</Link>
                </h5>
                <p className="card-text text-muted">{food.item_description?.slice(0,40)}...</p>
                <div className="d-flex justify-content-between align-item-center">
                  <span className="fw-bold">₹ {food.item_price}</span>
                  <Link to="#" className="btn btn-outline-primary btn-sm"><i className="fas fa-shopping-basket me-2"></i>Order Now</Link>
                </div>
              </div>
            </div>
          </div>
          ))
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default SearchPage;
