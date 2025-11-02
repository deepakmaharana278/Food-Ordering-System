import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import "../styles/track.css";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingData, setTrackingData] = useState([]);

  const { paramOrderNumber } = useParams();

  useEffect(() => {
    if (paramOrderNumber) {
      setOrderNumber(paramOrderNumber);
      handleTrack(paramOrderNumber);
    }
  }, [paramOrderNumber]);

  const handleTrack = async (orderNum) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/track_order/${ orderNum }/`);
      
      if (response.ok) {
          const data = await response.json();
          setTrackingData(data);
      } else {
        toast.error("Order not found or not placed yet.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while connecting");
    }
  };

  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container mt-4">
        <h3 className="mb-4 text-primary">
          <i className="fas fa-map-marker-alt me-1"></i>
          Track Your Order
        </h3>
        <div className="input-group mb-3 shadow-sm">
          <span className="input-group-text bg-white">
            <i className="fas fa-receipt text-muted"></i>
          </span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Enter Order Number" 
            value={orderNumber} 
            onChange={(e) => setOrderNumber(orderNumber)}
          />
          
        </div>
        <button onClick={()=>handleTrack(orderNumber)} className="btn btn-primary mb-4">
            <i className="fas fa-truck me-2"></i>
            Track
        </button>
      </div>
    </PublicLayout>
  );
};

export default TrackOrder;
