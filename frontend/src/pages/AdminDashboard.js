import React, { useEffect, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import SalesBarChart from '../components/SalesBarChart';
import { useNavigate } from 'react-router-dom';
import '../styles/admin_dashboard.css'
import TopProducts from './TopProducts';
import WeeklySalesChart from '../components/WeeklySalesChart';

const AdminDashboard = () => {
  const [matrics, setMetrices] = useState({
    total_orders: 0,
    new_orders: 0,
    confirmed_orders: 0,
    food_preparing: 0,
    food_pickup: 0,
    food_delivered: 0,
    cancelled_orders: 0,
    total_users: 0,
    total_categories: 0,
    today_sales: 0,
    week_sales: 0,
    month_sales: 0,
    year_sales: 0,
    total_reviews: 0,
    total_wishlists: 0,
  })
  const cardData = [
    {title:'Total Orders',key:'total_orders',color:'primary',icon:'fas fa-shopping-cart'},
    {title:'New Orders',key:'new_orders',color:'secondary',icon:'fas fa-cart-plus'},
    {title:'Confirmed Orders',key:'confirmed_orders',color:'info',icon:'fas fa-check-circle'},
    {title:'Food Being Prepared',key:'food_preparing',color:'warning',icon:'fas fa-utensils'},
    {title:'Food Pickup',key:'food_pickup',color:'dark',icon:'fas fa-motorcycle'},
    {title:'Food Delivered',key:'food_delivered',color:'success',icon:'fas fa-truck'},
    {title:'Cancelled Orders',key:'cancelled_orders',color:'danger',icon:'fas fa-times-circle'},
    {title:'Total Users',key:'total_users',color:'primary',icon:'fas fa-users'},
    {title:"Today's Sales",key:'today_sales',color:'info',icon:'fas fa-coins'},
    {title:"This Week's Sales",key:'week_sales',color:'secondary',icon:'fas fa-calendar-week'},
    {title:"This Month's Sales",key:'month_sales',color:'dark',icon:'fas fa-calendar-alt'},
    {title:"This Year's Sales",key:'year_sales',color:'success',icon:'fas fa-calendar'},
    {title:"Total Categories",key:'total_categories',color:'warning',icon:'fas fa-list'},
    {title:"Total Wishlists",key:'total_wishlists',color:'secondary',icon:'fas fa-heart'},
    {title:"Total Review",key:'total_reviews',color:'primary',icon:'fas fa-star'},
  ]
   const navigate = useNavigate();
    const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    if (!adminUser) {
      navigate("/login");
      return;
    }
    fetch("http://127.0.0.1:8000/api/dashboard-metrics/")
          .then((res) => res.json())
          .then((data) => {
            setMetrices(data);
            
          });
  }, [])
  return (
    
    <AdminLayout>
      <div className='row g-3'>
        {cardData.map((item,i)=>(
        <div key={i} className='col-md-3'>
          <div className={`card card-hover text-white bg-${item.color}`}>
            <div className='card-body d-flex justify-content-between align-items-center'>
              <div>
                  <h5 className='card-title'>{item.title}</h5>
                  <h5>{(item.title.includes('Sales')) ? `₹ ${matrics[item.key]}` : matrics[item.key]}</h5>
              </div>
              <i className={`${item.icon} fa-2x`}></i>
            </div>
          </div>
          </div>
        ))}
        <div className='col-md-3'>
          <div className="card bg-lignt d-flex justify-content-between align-items-center">
            <i className='fas fa-concierge-bell fa-2x text-danger mb-2'></i>
            <p className='fw-bold text-center'>Deepak<br />
              <span className='text-danger'>TasteRide</span>
            </p>
          
          
          </div>
          </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-6'>
          <SalesBarChart />
        </div>
        <div className='col-md-6'>
          <TopProducts/>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-6'>
          <WeeklySalesChart/>
        </div>
      </div>
      </AdminLayout>
    
  )
}

export default AdminDashboard