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
import OrderReport from './pages/OrderReport'
import ViewFoodOrder from './pages/ViewFoodOrder'
import SearchOrder from './pages/SearchOrder'
import EditCategory from './pages/EditCategory'
import EditFood from './pages/EditFood'
import ManageUser from './pages/ManageUser'
import { CartProvider } from './context/CartContext'
import FoodList from './pages/FoodList'
import { WishlistProvider } from './context/WishlistContext'
import Wishlist from './pages/Wishlist'
import TrackOrder from './pages/TrackOrder'
import ManageReview from './pages/ManageReview'

const App = () => {
  return (
    <WishlistProvider>
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        
        {/* Admin page */}
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/add-category' element={<AddCategory/>} />
        <Route path='/manage-category' element={<ManageCategory/>} />
        <Route path='/add-food' element={<AddFood/>} />
        <Route path='/manage-food' element={<ManageFood/>} />
        <Route path='/admin/not-confirmed' element={<OrderNotConfirmed/>} />
        <Route path='/admin/all-orders' element={<AllOrders/>} />
        <Route path='/admin/order-confirmed' element={<OrderConfirmed/>} />
        <Route path='/admin/food_being_prepared' element={<FoodBeingPrepared/>} />
        <Route path='/admin/food-pickup' element={<FoodPickup/>} />
        <Route path='/admin/order-delivered' element={<OrderDelivered/>} />
        <Route path='/admin/order-cancelled' element={<OrderCancelled/>} />
        <Route path='/admin/order-report' element={<OrderReport/>} />
        <Route path='/admin-view-order-detail/:order_number' element={<ViewFoodOrder/>} />
        <Route path='/admin-search-order' element={<SearchOrder/>} />
        <Route path='/manage_category/edit-category/:id' element={<EditCategory/>} />
        <Route path='/manage_food/edit-food/:id' element={<EditFood/>} />
        <Route path='/manage_user' element={<ManageUser/>} />
        <Route path='/manage_reviews' element={<ManageReview/>} />
        
        {/* User page */}
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
        <Route path='/food-menu' element={<FoodList/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/track' element={<TrackOrder/>} />
        <Route path='/track-order/:paramOrderNumber' element={<TrackOrder/>} />
      </Routes>
      </BrowserRouter>
      </CartProvider>
      </WishlistProvider>
  )
}

export default App