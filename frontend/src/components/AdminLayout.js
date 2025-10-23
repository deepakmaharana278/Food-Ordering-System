import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/dashboard-metrics/")
      .then((res) => res.json())
      .then((data) => {
        setNewOrders(data.new_orders);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); // Mobile view
      } else {
        setSidebarOpen(true); // Desktop view
      }
    };

    handleResize(); //intial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="d-flex">
      {sidebarOpen && <AdminSidebar />}

      <div id="page-content-wrapper" className={`w-100 ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        <AdminHeader newOrders={newOrders} toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="container-fluid mt-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
