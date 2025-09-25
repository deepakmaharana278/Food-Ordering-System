import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); // Mobile view
      } else {
        setSidebarOpen(true) // Desktop view
      }
    }

    handleResize() //intial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="d-flex">
      {sidebarOpen && <AdminSidebar />}
      
      <div id="page-content-wrapper" className={`w-100 ${sidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="container-fluid mt-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
