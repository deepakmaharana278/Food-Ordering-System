import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useParams, useNavigate } from "react-router-dom";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'

const FoodDetail = () => {
  const userId = localStorage.getItem("userId");
  const [food, setFood] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
      });
  }, []);

  if (!food) return <div>Loding...</div>;

  return (
    <PublicLayout>
      <div className="container py-5">
        <div className="row">
                  <div className="col-md-5 text-center">
                      <Zoom>
            <img src={`http://127.0.0.1:8000${food.image}`} style={{ width: "100%", maxHeight: "300px" }} alt={food.item_name} />
            </Zoom>
          </div>
          <div className="col-md-7 text-primary">
            <h2>{food.item_name}</h2>
            <p className="text-muted">{food.item_description}</p>
            <p>
              <strong>Category :</strong> {food.category_name}
            </p>
            <h4>₹ {food.item_price}</h4>
            <p className="mt-3">
              Shipping : <strong>Free</strong>
            </p>

            {food.is_available ? (
              <button className="btn btn-warning btn-lg mt-3 px-4">
                <i className="fas fa-cart-plus me-2"></i>Add to Cart
              </button>
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
    </PublicLayout>
  );
};

export default FoodDetail;
