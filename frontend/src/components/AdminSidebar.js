import React from "react";
import "../styles/admin.css";
import { Link } from "react-router-dom";
import { FaEdit, FaSearch, FaStreetView, FaThLarge, FaUsers } from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <div className="bg-dark text-white sidebar">
      <div className="text-center p-3 border-bottom">
        <img src="/images/admin.jpg" alt="admin" className="img-fluid rounded-circle mb-2" width="70" />
        <h6 className="mb-0">Admin</h6>
      </div>
      
      <div className="list-group list-group-flush"> 
        <Link className="list-group-item list-group-item-action bg-dark text-white">
          <FaThLarge/> Dashboard
        </Link>
      </div>
      
      <div className="list-group list-group-flush"> 
        <Link className="list-group-item list-group-item-action bg-dark text-white">
          <FaUsers/> Reg Users
        </Link>
      </div>
      
      <button className="list-group-item list-group-item-action bg-dark text-white">
        <FaEdit/> Food Category
      </button>
        <div>
          <Link className="list-group-item list-group-item-action bg-dark text-white">
            <FaSearch/> Search
        </Link>
        
        <Link className="list-group-item list-group-item-action  bg-dark text-white">
          <FaSearch/> Search
        </Link>
        </div>
      
      <div className="list-group list-group-flush"> 
        <Link className="list-group-item list-group-item-action bg-dark text-white">
          <FaSearch/> Search
        </Link>
      </div>
      
      <div className="list-group list-group-flush"> 
        <Link className="list-group-item list-group-item-action bg-dark text-white">
          <FaStreetView/> Manage Reviews
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
