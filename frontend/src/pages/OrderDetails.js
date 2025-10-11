import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
    const userId = localStorage.getItem('userId')
    const [orderItems, setOrderItems] = useState([]);
    const [orderAddress, setOrderAddress] = useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate()
    const {order_number} = useParams()
    
    useEffect(() => {
        if (!userId) {
            navigate("/login");
        }
        fetch(`http://127.0.0.1:8000/api/orders/by_order_number/${order_number}/`)
            .then((res) => res.json())
            .then((data) => {
                setOrderItems(data);
                const totalAmount = data.reduce((sum, item) => sum + item.food.item_price * item.quantity, 0);
                setTotal(totalAmount);
            });
        }, [order_number]);

  return (
    <PublicLayout>
     <div className="container py-5">
       <h3 className="mb-4 text-primary">
        <i className="fas fa-receipt me-2"></i>
        Order #{order_number} Details
       </h3>
       
       <div className="row">
        <div className="col-md-8">
         {orderItems?.map((item,index)=>( 
            <div key={index} className="card mb-3 shadow-sm border-0">
            <div className="row">
              <div className="col-md-4">
                <img src={`http://127.0.0.1:8000${item.food.image}`} className="img-fluid rounded" style={{ minHeight: "200px",height:"250px",width:'100%' }} alt={item.food.item_name} />
              </div>
              <div className="col-md-8">
                 <h5>{item.food.item_name} ({item.food.item_quantity})</h5>
                 <p>{item.food.item_description}</p>
                 <p><strong>Price: </strong>₹ {item.food.item_price}</p>
                 <p><strong>Quantity: </strong>{item.quantity}</p>
              </div>
            </div>
          </div>
         ))}
          
        </div>
        <div className="col-md-4"></div>
       </div>
     </div>
    </PublicLayout>
  )
}

export default OrderDetails