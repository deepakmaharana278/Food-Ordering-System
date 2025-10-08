import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItem, setCartItem] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    fetch(`http://127.0.0.1:8000/api/cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItem(data);
        const total = data.reduce((sum, item) => sum + item.food.item_price * item.quantity, 0);
        setGrandTotal(total);
      });
  }, [userId]);

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <h2 className="mb-4 text-center text-primary">
          <i className="fa fa-cart-shopping me-2"></i>Your Cart
        </h2>

        {cartItem.length === 0 ? (
          <p className="text-center text-muted">Your Cart is Empty</p>
        ) : (
          <>
            <div className="row">
              {cartItem.map((item) => (
                <div className="col-md-6 mb-4">
                  <div className="card shadow-sm">
                    <div className="row">
                      <div className="col-md-4">
                        <img src={`http://127.0.0.1:8000${item.food.image}`} className="img-fluid rounded-start" style={{ minHeight: "230px" }} alt={item.food.item_name} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{item.food.item_name}</h5>
                          <p className="card-text text-muted small">{item.food.item_description}</p>
                          <p className="fw-bold text-success small">₹ {item.food.item_price}</p>
                          <div className="d-flex align-item-center mb-2">
                            <button className="btn btn-sm btn-outline-secondary me-2" disabled={item.quantity <= 1}>
                              <FaMinus />
                            </button>
                            <span className="fw-bold px-2">{item.quantity}</span>
                            <button className="btn btn-sm btn-outline-secondary ms-2">
                              <FaPlus />
                            </button>
                          </div>
                          <button className="btn btn-sm btn-outline-danger">
                            <FaTrash className="me-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  );
};

export default Cart;
