import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useParams,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {

  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/login");
      return;
    }

    fetch(`http://127.0.0.1:8000/api/category-detail/${ id }`)
      .then((res) => res.json())
      .then((data) => setCategoryName(data.category_name))
      .catch(err=>console.error(err))
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault()
  
         
    fetch(`http://127.0.0.1:8000/api/category-detail/${ id }/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({category_name:categoryName})
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message)
        setTimeout(() => {
          navigate("/manage-category");
        }, 2000);
      })
      .catch(err=>console.error(err))
      }




  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row">
        <div className="col-md-8">
          <div className="shadow-sm p-4 rounded">
            <h4 className="mb-4">
              <i className="fas fa-pen-square text-dark me-2"></i>Edit Category
            </h4>
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-control" placeholder="Enter Category Name" required onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                <i className="fas fa-save me-2"></i> Update Category
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
            <i className="fas fa-utensils" style={{fontSize:'180px',color:'#e5e5e5'}}></i>
        </div>
      </div>
    </AdminLayout>
  )
}

export default EditCategory