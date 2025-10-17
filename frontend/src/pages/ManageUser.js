import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from 'react-csv'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUser = () => {

    const [users, setUser] = useState([]);
    const [allUsers, setAllUser] = useState([]);
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

   
    
    
    useEffect(() => {
        if (!adminUser) {
        navigate("/login");
        return;
    }  

        fetch("http://127.0.0.1:8000/api/manage-users/")
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setAllUser(data);
          });
      }, []);
    
        const handleSearch = (s) => {
            const keyword = s.toLowerCase();
            if (!keyword) {
                setUser(allUsers)
            } else {
                const filtered = allUsers.filter((u) => 
                u.first_name.toLowerCase().includes(keyword) || 
                u.last_name.toLowerCase().includes(keyword)  ||
                u.email.toLowerCase().includes(keyword)
            )
                setUser(filtered)
            }
        }
    
        const handleDelete = (id) => {
    
            if (window.confirm("Are you sure you want to delete this user")) {
              fetch(`http://127.0.0.1:8000/api/delete-user/${ id }/`, {
                method:'DELETE'
              })
                .then(res=>res.json())
                .then(data => {
                  toast.success(data.message)
                  setUser(users.filter(user => user.id !== id));
                })
              .catch(err=>console.error(err)
              )
            } 
        }

  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div>
        <h3 className="text-center text-dark mb-4">
          <i className="fas fa-list-alt me-1"></i>
          Manage Users
        </h3>
        <h5 className="text-end text-muted">
          <i className="fas fa-database me-2"></i>
          Total User
          <span className="ms-2 badge bg-success">{users.length}</span>
        </h5>

        <div className="mb-3 d-flex justify-content-between">
          <input type="text" className="form-control w-50" placeholder="Search by email or name..." onChange={(e) => handleSearch(e.target.value)} />
          
          <CSVLink data={users} className="btn btn-success" filename="users_list.csv">
            <i className="fas fa-file-csv me-2"></i>Export to CSV
          </CSVLink>
        </div>

        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>Sl.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index+1}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={()=> handleDelete(user.id)} className="btn btn-sm btn-danger">
                    <i className="fas fa-trash-alt me-1"></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default ManageUser