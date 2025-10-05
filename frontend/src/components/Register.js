import React, { useState } from "react";
import PublicLayout from "./PublicLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        repeat_password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:value
        }));
    }

  return (
    <PublicLayout>
      <div className="container py-5">
        <div className="row shadow-lg rounded-5 text-primary">
          <div className="col-md-6 p-4">
            <h3 className="text-center mb-4">
              <i className="fas fa-user-plus me-2"></i>User Registration
            </h3>
            <form action="">
                {/* First Name */}
              <div className="mb-3">
                <input name="first_name" type="text" className="form-control" placeholder="First Name" required value={formData.first_name} onChange={handleChange} />
              </div>
              {/* Last Name */}
              <div className="mb-3">
                <input name="last_name" type="text" className="form-control" placeholder="Last Name" required value={formData.last_name} onChange={handleChange}/>
              </div>
              {/* email */}
              <div className="mb-3">
                <input name="email" type="email" className="form-control" placeholder="xyz@gmail.com" required value={formData.email} onChange={handleChange}/>
              </div>
              {/* Mobile Number */}
              <div className="mb-3">
                <input name="mobile" type="text" className="form-control" placeholder="Mobile number" required value={formData.mobile} onChange={handleChange}/>
              </div>
              {/* Password */}
              <div className="mb-3">
                <input name="password" type="password" className="form-control" placeholder="Password" required value={formData.password} onChange={handleChange}/>
              </div>
              {/* Repeat Password */}
              <div className="mb-3">
                <input name="repeat_password" type="password" className="form-control" placeholder="Repeat password" required value={formData.repeat_password} onChange={handleChange}/>
              </div>
              <button className="btn btn-outline-primary w-100"><i className="fas fa-user-check me-2"></i>Submit</button>
            </form>
          </div>

          <div className="col-md-6 d-flex align-item-center justify-content-center">
            <div className="p-4 text-center text-primary">
                <img src="/images/Register.jpg" alt="Register" className="img-fluid" style={{maxHeight:'400px'}}/>
                <h5 className="mt-3">Registration is fast, secure and free.</h5>
                <p className="text-muted small">Join our food family and enjoy delicious food delivered to your door!</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Register;
