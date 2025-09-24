import React from "react";
import "../styles/admin.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({children}) => {
  return (
    <div className="d-flex">
      <AdminSidebar />
      <div id="page-content-wrapper" className="w-100">
        <AdminHeader />
        <div className="container-fluid mt-4">
            {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
