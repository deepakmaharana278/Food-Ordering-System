import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/login");
    }
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search-orders/?q=${searchTerm}`);

        const data = await response.json();
        
        setOrders(data);
        setSubmitted(true)
      
    } catch (error) {
      console.error(error);
      toast.error("Error Connecting to server");
    }
  };

  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container mt-4">
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-search me-1"></i>
          Search Orders
        </h3>

        <form onSubmit={handleSearch} className="d-flex" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            name="q"
            placeholder="Enter order number"
            className="form-control"
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          />
          <button
            type="submit"
            className="btn btn-info px-4"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            Search
          </button>
        </form>

        {submitted > 0 && (
          <table className="table table-bordered table-hover table-striped mt-5">
            <thead className="table-dark">
              <tr>
                <th>Sl.No</th>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default SearchOrder;
