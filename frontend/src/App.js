import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory'
import ManageCategory from './pages/ManageCategory'
import AddFood from './pages/AddFood'
import ManageFood from './pages/ManageFood'
import SearchPage from './pages/SearchPage'
import Register from './components/Register'
import Login from './components/Login'
import FoodDetail from './pages/FoodDetail'
import Cart from './pages/Cart'
import PaymentPage from './pages/PaymentPage'
import MyOrder from './pages/MyOrder'
import OrderDetails from './pages/OrderDetails'
import ProfilePage from './pages/ProfilePage'
import ChangePassword from './pages/ChangePassword'
import OrderNotConfirmed from './pages/OrderNotConfirmed'
import AllOrders from './pages/AllOrders'
import OrderConfirmed from './pages/OrderConfirmed'
import FoodBeingPrepared from './pages/FoodBeingPrepared'
import FoodPickup from './pages/FoodPickup'
import OrderDelivered from './pages/OrderDelivered'
import OrderCancelled from './pages/OrderCancelled'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/add-category' element={<AddCategory/>} />
        <Route path='/manage-category' element={<ManageCategory/>} />
        <Route path='/add-food' element={<AddFood/>} />
        <Route path='/manage-food' element={<ManageFood/>} />
        <Route path='/search' element={<SearchPage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/food/:id' element={<FoodDetail/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/payment' element={<PaymentPage/>} />
        <Route path='/my-orders' element={<MyOrder/>} />
        <Route path='/order-details/:order_number' element={<OrderDetails/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/change-password' element={<ChangePassword/>} />
        <Route path='/admin/not-confirmed' element={<OrderNotConfirmed/>} />
        <Route path='/admin/all-orders' element={<AllOrders/>} />
        <Route path='/admin/order-confirmed' element={<OrderConfirmed/>} />
        <Route path='/admin/food_being_prepared' element={<FoodBeingPrepared/>} />
        <Route path='/admin/food-pickup' element={<FoodPickup/>} />
        <Route path='/admin/order-delivered' element={<OrderDelivered/>} />
        <Route path='/admin/order-cancelled' element={<OrderCancelled/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App