import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useParams, useNavigate } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodDetail = () => {
  const userId = localStorage.getItem("userId");
  const [food, setFood] = useState(null);
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
      })
    
    fetch(`http://127.0.0.1:8000/api/reviews/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
  }, [id]);

  const handleAddToCart = async () => {
    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/add-cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          foodId: food.id,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.message || "Item added to cart");
        setTimeout(() => {
          navigate('/cart')
        }, 2000);
      } else {
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Connecting to server");
    }
  };

  const handleReviewSubmit = async () => {
    if (!userId) {
      toast.warning('Please login first  to submit review');
      navigate('/login');
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating from 1 to 5');
      return;
    }

    const payload = {
      user_id: userId,
      food: id,
      rating,
      comment
    };

    const url = editId ? `http://127.0.0.1:8000/api/review_edit${ editId }/` : `http://127.0.0.1:8000/api/reviews/add/${ id }/`;

    const method = editId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      if (response.ok) {
        toast.success(editId ? 'Review updated' : 'Review Submitted');
        setComment('');
        setRating(0);
        setEditId(null);
        const updatedReviews = await fetch(`http://127.0.0.1:8000/api/reviews/${ id }/`).then(res => res.json());
        setReviews(updatedReviews)
        
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Connecting to server");
    }
  };


  const fetchReviews = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/reviews/${ id }/`);
    const data = await res.json();
    setReviews(data);
  };

  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm('Are you sure to delete this review?');
    if (!confirmDelete) return;
    const res = await fetch(`http://127.0.0.1:8000/api/review_edit/${ id }/`, {
      method: 'DELETE',
    });
    if (res.ok) {
      toast.success('Review deleted');
      fetchReviews() //reload
    } else {
      toast.error('Failed to delete')
    }
  };

  const renderStars = (count, clickable = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++){
      stars.push(
        <i
          key={i}
          className={`fa-star ${ i <= (hoveredRating || count) ? 'fas text-warning' : 'far text-secondary' }`}
          style={{ cursor: clickable ? 'pointer' : `default`, fontSize: '20px', marginRight: '4px' }}
          onClick={clickable ? () => setRating(i) : undefined}
          onMouseEnter={clickable ? () => setHoveredRating(i) : undefined}
          onMouseLeave={clickable ? () => setHoveredRating(0) : undefined}
        ></i>
      )
    }
  }

  if (!food) return <div>Loding...</div>;

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
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
              <button className="btn btn-warning btn-lg mt-3 px-4" onClick={handleAddToCart}>
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
