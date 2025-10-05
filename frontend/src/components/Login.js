import React, { useState } from "react";
import PublicLayout from "./PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import '../styles/home.css'


const Login = () => {
    const [formData, setFormData] = useState({
            emailcont: '',
            password: ''
        });
        const navigate = useNavigate();
    
        const handleChange = (e) => {
            const { name, value } = e.target;
    
            setFormData((prev) => ({
                ...prev,
                [name]:value
            }));
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            const { emailcont, password } = formData
    
    
            try {
              const response = await fetch("http://127.0.0.1:8000/api/login/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emailcont, password }),
              });
        
              const result = await response.json();
        
              if (response.status === 200) {
                  toast.success(result.message);
                  localStorage.setItem('userId',result.userId)
                  localStorage.setItem('userName',result.userName)
                  setFormData({
                     emailcont: '',
                     password: ''   
                    })
                  setTimeout(() => {
                     navigate('/')
                    },2000)
              } else {
                toast.error('Invalid credentionals');
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
  <div className="row align-items-center g-5">
    <div className="col-md-6">
      <div className="card border-0 shadow-lg rounded-4 p-5">
        <h2 className="mb-4 text-center fw-bold text-primary"><i className="fas fa-sign-in-alt me-2"></i>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-4">
            <input
              id="emailcont"
              name="emailcont"
              type="text"
              className="form-control form-control-lg"
              placeholder="Email or Mobile Number"
              value={formData.emailcont}
              onChange={handleChange}
              required
              />
            <label htmlFor="emailcont">Email or Mobile Number</label>
          </div>
          <div className="form-floating mb-4">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary w-100 py-3 fw-bold"
          >
            <i className="fas fa-sign-in-alt me-2"></i> Login
          </button>
        </form>
        <p className="text-center mt-3 text-muted">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary text-decoration-none fw-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>

    <div className="col-md-6 text-center">
      <img
        src="/images/login.png"
        alt="Login illustration"
        className="img-fluid rounded-4 shadow-lg"
        style={{ maxHeight: "400px" }}
      />
    </div>
  </div>
</div>

    </PublicLayout>
  )
}

export default Login