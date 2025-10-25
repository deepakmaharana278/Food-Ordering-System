import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import "../styles/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/random_foods`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      });
  }, []);

  return (
    <PublicLayout>
      <section className="hero py-5 text-center" style={{ backgroundImage: "url('images/hero.jpg')" }}>
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "40px 20px",
            borderRadius: "10px",
          }}
        >
          <h1 className="display-4">Hot & Ready, Delivered Quickly</h1>
          <p className="lead">Your Tastebuds Called. We Answered. Delivered</p>

          <form method="GET" action="/search" className="d-flex" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <input
              type="text"
              name="q"
              placeholder="I would like to eat"
              className="form-control"
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <button
              className="btn btn-warning px-4"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">
            Most Loved Dishes This Month
            <span className="badge bg-danger ms-2">Top Picks</span>
          </h2>

          <div className="row mt-4">
            {foods.length === 0 ? (
              <p className="text-center">No Foods Found</p>
            ) : (
              foods.map((food) => (
                <div key={food.id} className="col-md-4 mb-4">
                  <div className="card hovereffect">
                    <div className="position-relative">
                      <img src={`http://127.0.0.1:8000${food.image}`} className="card-img-top" alt={food.item_name} style={{ height: "180px" }} />
                      <div
                        className="position-absolute top-0 end-0 m-2 bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
                        style={{
                          width: "36px",
                          height: "36px",
                          cursor: "pointer",
                          border: '1px solid #000',
                        }}
                      >
                        <i className="fas fa-heart heart-anim text-danger" style={{ fontSize: "18px" }}></i>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        <Link to={`/food/${food.id}`}>{food.item_name}</Link>
                      </h5>
                      <p className="card-text text-muted">{food.item_description?.slice(0, 40)}...</p>
                      <div className="d-flex justify-content-between align-item-center">
                        <span className="fw-bold">₹ {food.item_price}</span>
                        {food.is_available ? (
                          <Link to={`/food/${food.id}`} className="btn btn-outline-primary btn-sm">
                            <i className="fas fa-shopping-basket me-2"></i>Order Now
                          </Link>
                        ) : (
                          <div title="This food item is not avilable right now.">
                            <button className="btn btn-outline-secondary btn-sm">
                              <i className="fas fa-times-circle me-2"></i>Currently Unavailable
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-5 bg-dark text-white">
        <div className="container text-center">
          <h2>Ordering in 3 Simple Steps</h2>
          <div className="row mt-4">
            <div className="col-md-4">
              <h4>1. Pick a dish you love</h4>
              <p>Explore hundreds of mouth-watering options and choose what you creave!</p>
            </div>
            <div className="col-md-4">
              <h4>2. Share your location</h4>
              <p>Tell us where you are, and we'll handle the rest.</p>
            </div>
            <div className="col-md-4">
              <h4>3. Enjoy doorstep delivery</h4>
              <p>Relax while your meal arrives fast and fresh - pay when it's delivered!</p>
            </div>
          </div>
          <p>Pay easily with Cash on Delivery - hassle-free!</p>
        </div>
      </section>
      <section className="py-5 bg-warning text-center text-dark">
        <h4>Ready to Satisfy Your Hunger?</h4>
        <Link to="" className="btn btn-dark btn-lg">
          Browse full Menu
        </Link>
      </section>
    </PublicLayout>
  );
};

export default Home;
