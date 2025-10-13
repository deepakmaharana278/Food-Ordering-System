import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderReport = () => {
  const adminUser = localStorage.getItem("adminUser");
  const [formData, setFormData] = useState({
    from_date: "",
    to_date: "",
    status: "all",
  });
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      navigate("/login");
    }

    fetch("http://127.0.0.1:8000/api/orders_delivered/")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:8000/api/order-between-dates/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.status === 200) {
          setOrders(data)
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error Connecting to server");
      }
  };
  


  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div>
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-calendar-days me-1"></i>
          Between Dates Reports
        </h3>
      
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row mb-3">
            <div className="col-md-4">
              <label>From Date</label>
              <input type="date" name="from_date" onChange={handleChange} className="form-control mt-2" required/>
            </div>
            <div className="col-md-4">
              <label>To Date</label>
              <input type="date" name="to_date" onChange={handleChange} className="form-control mt-2" required/>
            </div>
            <div className="col-md-4">
              <label>Status</label>
              <select name="status" onChange={handleChange} className="form-control mt-2">
                <option value="all">All Orders</option>
                <option value="not_confirmed">Not Confirmed</option>
                <option value="confirmed">Order Confirmed</option>
                <option value="food_being_prepared">Food Being Prepared</option>
                <option value="">Food Pickup</option>
                <option value="food_being_prepared">Order Delivered</option>
                <option value="food_being_prepared">Order Cancelled</option>
              </select>
            </div>
          </div>
        </form>

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sl.No</th>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.order_number}</td>
                <td>{new Date(order.order_time).toLocaleString()}</td>
                <td>
                  <a href={`/admin-view-order-detail/${order.order_number}`} className="btn btn-sm btn-info me-2">
                    <i className="fas fa-info-circle me-1"></i>View Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrderReport;
