import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFoodOrder = () => {
  const adminUser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  const { order_number } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!adminUser) {
      navigate("/login");
    }
    fetch(`http://127.0.0.1:8000/api/view-order-details/${order_number}/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [order_number]);

  if (!data)
    return (
      <AdminLayout>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem", borderWidth: "0.6rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );

  const { order, foods, tracking } = data;

  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container mt-4">
        <h3 className="text-center text-primary mb-4">Order Details # {order.order_number}</h3>

        <div className="row">
          <div className="col-md-6">
            <h5>User Info</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>First Name</th>
                  <td>{order.user_first_name}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{order.user_last_name}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{order.user_email}</td>
                </tr>
                <tr>
                  <th>Mobile Number</th>
                  <td>{order.user_mobile}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{order.address}</td>
                </tr>
                <tr>
                  <th>Order Time</th>
                  <td>{new Date(order.order_time).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Final Status</th>
                  <td>{order.order_final_status || "Pending"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-6">
            <h5>Ordered Foods</h5>
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {foods.map((food,index)=>(
                    <tr key={index}>
                     <td><img src={` http://127.0.0.1:8000/${food.image}`} alt={food.item_name} width={50} /></td>
                        <td>{food.item_name}</td>
                        <td>{food.item_price}</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>  
        
        <h5 className="mt-4">Tracking History</h5>
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>Sl.no.</th>
                <th>Status</th>
                <th>Remark</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {tracking.length ==0 ? (
                <tr>
                    <td colSpan='4' className="text-center">No Tracking History yet</td>
                </tr>
            ) :(
             tracking.map((track,index)=>(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{track.status}</td>
                    <td>{track.remark}</td>
                    <td>{new Date(track.status_date).toLocaleString()}</td>
                </tr>
            )))}
            </tbody>
        </table>
        
      </div>
    </AdminLayout>
  );
};

export default ViewFoodOrder;
