import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory'
import ManageCategory from './pages/ManageCategory'
import AddFood from './pages/AddFood'
import ManageFood from './pages/ManageFood'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App