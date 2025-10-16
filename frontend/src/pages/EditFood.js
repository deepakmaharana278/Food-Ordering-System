import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useParams,useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFood = () => {
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        category: '',
        item_name : '',
        item_price : '',
        item_description : '',
        image : '',
        item_quantity :''
    })
    const { id } = useParams();
    const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

    useEffect(() => {
    if (!adminUser) {
        navigate("/login");
        return;
    }

    fetch(`http://127.0.0.1:8000/api/edit-food/${ id }`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch(err => console.error(err))
        
    fetch(`http://127.0.0.1:8000/api/manage-category/`)
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch(err=>console.error(err))
    }, [id]);


    const handleChange = (e) => {
            const { name, value } = e.target;
    
            setFormData((prev) => ({
                ...prev,
                [name]:value
            }));
        }
        const handleFileChange = (e) => {
    
            setFormData((prev) => ({
                ...prev,
                image:e.target.files[0]
            }));
        }
        
      
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = new FormData() 
        data.append("category", formData.category);
        data.append("item_name", formData.item_name);
        data.append("item_description", formData.item_description);
        data.append("item_quantity", formData.item_quantity);
        data.append("item_price", formData.item_price);
        data.append("image", formData.image);
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/edit-food/${ id }`, {
                method: "PUT",
                body: data,
            });
    
            const result = await response.json();
    
            if (response.status === 200) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error Connecting to server");
        }
    }

  return (
    <AdminLayout>
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row">
        <div className="col-md-8">
          <div className="shadow-sm p-4 rounded">
            <h4 className="mb-4">
              <i className="fas fa-pen-square text-dark me-2"></i>Edit Food Item
            </h4>
            <form onSubmit={handleUpdate} encType="multipart/formdata">
              <div className="mb-3">
                <label className="form-label">Food Category</label>
                {/* select category */}
                <select name="category" id="" className="form-select" onChange={handleChange}>
                    <option value={formData.category}>Select Category</option>
                    
                    {categories?.map((cat)=>(
                        <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                    ))}
                </select>
              </div>
            {/* food item name */}
              <div className="mb-3">
                <label className="form-label">Food Item Name</label>
                <input name="item_name" type="text" className="form-control" placeholder="Enter Food Item Name" required value={formData.item_name} onChange={handleChange}/>
              </div>
            {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="item_description" className="form-control" placeholder="Enter Description" required value={formData.item_description} onChange={handleChange}></textarea>
              </div>
            {/* Quantity */}
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input name="item_quantity" type="text" className="form-control" placeholder="e.g. 2 pcs / Large" required value={formData.item_quantity} onChange={handleChange}/>
              </div>
            {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price(₹)</label>
                <input name="item_price" type="number" className="form-control" required step=".01" onChange={handleChange} value={formData.item_price}/>
              </div>
            {/* Image */}
              <div className="mb-3">
                <label className="form-label"></label>
                <input name="image" type="file" className="form-control" accept="image/*" required  onChange={handleFileChange}/>
              </div>
              
              <button type="submit" className="btn btn-primary w-100 mt-3">
                <i className="fas fa-save me-2"></i>Update Food Item
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <i className="fas fa-pizza-slice" style={{ fontSize: "180px", color: "#e5e5e5" }}></i>
        </div>
      </div>
    </AdminLayout>
  )
}

export default EditFood;