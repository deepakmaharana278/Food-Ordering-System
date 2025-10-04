import React, { useState } from "react";
import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { VscAccount } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
import '../styles/admin.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PublicLayout from "../components/PublicLayout";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://127.0.0.1:8000/api/admin-login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({username,password})
    });

    const data = await response.json();

    if (response.status === 200) {
      toast.success(data.message);
      localStorage.setItem("adminUser", username);
      setTimeout(() => {
        window.location.href = 'admin-dashboard';
      },2000)
    } else {
      toast.error(data.message)
    }
  }
    


  return (
    <PublicLayout>
    <div className="d-flex justify-content-center align-items-center vh-100" 
    style={{
      backgroundImage:"url('/images/adminbg.jpg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="card p-4 shadow-lg" style={{maxWidth:'400px', width:'100%'}}>
        <h4 className="text-center mb-4">
          <FaUser className="me-2 icon-fix"/> Admin Login
        </h4>
        <form onSubmit={handleLogin}>
            <div className="mb-3">
                <label className="form-label">
                    <VscAccount icon-fix className="me-1"/> User Name</label>
                <input type="text" className="form-control" placeholder="Enter username" required onChange={(e)=>setUsername(e.target.value)} value={username}/>
            </div>
            
            <div className="mb-3">
                <label className="form-label">
                    <TbLockPassword icon-fix className="me-1"/> Password</label>
                <input type="password" className="form-control" placeholder="Enter password" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </div>
            
            <button type="submit" className="btn btn-primary w-100 mt-3"><FaSignInAlt className="me-1"/> Login</button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
      </div>
      </PublicLayout>
  );
};

export default AdminLogin;
