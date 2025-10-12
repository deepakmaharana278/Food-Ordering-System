import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {

    const userId = localStorage.getItem("userId");
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
    }, []);

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
        try {

            if (formData.new_password !== formData.confirm_password) {
                toast.error('New password & confirm password do not match')
                return;
            }

            const response = await fetch(`http://127.0.0.1:8000/api/change_password/${ userId }/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({current_password:formData.current_password,new_password:formData.new_password})
            });
    
            const result = await response.json();
    
            if (response.status === 200) {
            toast.success(result.message || "Password changed successfully");
            } else {
            toast.error(result.message || "Something Went Wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error Connecting to server");
        }
        };


  return (
    <PublicLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="container py-5">
        <h3 className="text-center text-primary mb-4">
          <i className="fas fa-key me-1"></i>Change Password
        </h3>

        <form onSubmit={handleSubmit} className="card p-4 shadow border-0">
          <div>
            <div className="mb-3">
              <label className="mb-1">Current Password</label>
              <input type="password" name="current_password" className="form-control" value={formData.current_password} onChange={handleChange} placeholder="Enter your current password"/>
            </div>
            <div className="mb-3">
              <label className="mb-1">New Password</label>
              <input type="password" name="new_password" className="form-control" value={formData.new_password} onChange={handleChange} placeholder="Enter new password"/>
            </div>
            <div className="mb-3">
               <label className="mb-1">Confirm Password</label>
               <input type="password" name="confirm_password"  className="form-control" value={formData.confirm_password} onChange={handleChange} placeholder="Re-enter new password"/>
            </div>
              
          </div>
          <button type="submit" className="btn btn-primary mt-3"><i className="fas fa-check-circle me-2"></i>Change Password</button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default ChangePassword;
