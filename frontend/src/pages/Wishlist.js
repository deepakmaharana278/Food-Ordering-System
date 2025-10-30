import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { setWishlistCount } = useWishlist();
  const userId = localStorage.getItem("userId");

  const fetchWishlist = async () => {
    if (userId) {
      const res = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}`);
      const data = await res.json();
      setWishlist(data);
    }
  };

  const removeFromWishlist = async (foodId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/wishlist/remove/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          food_id: foodId,
        }),
      });
      if (response.ok) {
        const updatedCount = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}`);
        const WishlistData = await updatedCount.json();
        setWishlistCount(WishlistData.length);

          toast.success("Removed from wishlist");
          fetchWishlist();
      } else {
        toast.error("Failed to update wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while connecting");
    }
    };
    
    useEffect(() => {
        fetchWishlist();
    },[userId])

  return (
      <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <h2 className="mb-4">My Wishlist</h2>
        <div className="row mt-4">
          {wishlist.length === 0 ? (
            <p className="text-center">No Items in Wishlist</p>
          ) : (
            wishlist.map((food,index) => (
              <div key={food.index} className="col-md-4 mb-4">
                <div className="card hovereffect">
                  <div className="position-relative">
                    <img src={`http://127.0.0.1:8000${food.image}`} className="card-img-top" alt={food.item_name} style={{ height: "180px" }} />
                    <div
                      className="position-absolute top-0 end-0 m-2 bg-white rounded-circle d-flex justify-content-center align-items-center shadow"
                      style={{
                        width: "36px",
                        height: "36px",
                        cursor: "pointer",
                        border: "1px solid #000",
                      }}
                    >
                      <i className="fas fa-heart heart-anim text-danger" 
                      style={{ fontSize: "18px" }} onClick={() => removeFromWishlist(food.food_id)}></i>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/food/${food.food_id}`}>{food.item_name}</Link>
                    </h5>
                    <p className="card-text text-muted">{food.item_description?.slice(0, 40)}...</p>
                    <div className="d-flex justify-content-between align-item-center">
                      <span className="fw-bold">₹ {food.item_price}</span>
                      {food.is_available ? (
                        <Link to={`/food/${food.food_id}`} className="btn btn-outline-primary btn-sm">
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
    </PublicLayout>
  );
};

export default Wishlist;
