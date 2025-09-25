import React from 'react';
import { FaBars, FaBell, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaUtensils } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminHeader = ({toggleSidebar,sidebarOpen}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminUser")
    navigate("/admin-login")
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white border-bottom px-3 shadow-sm'>

      <button className='btn btn-outline-dark me-3' onClick={toggleSidebar}>
        {sidebarOpen ? <FaChevronLeft/> : <FaChevronRight/>}
      </button>

      <span className='navbar-brand fw-semibold d-flex align-items-center'>
        <FaUtensils className='me-2'/> Deepak TasteRide
      </span>
      <button className='navbar-toggler border-0 ms-auto' type="button">
        <FaBars />
      </button>
      <div className='collapse navbar-collapse'>
        <ul className='navbar-nav ms-auto align-items-center gap-2'>
          <li className='nav-item'>
            <button className='btn btn-secondary'>
              <FaBell/>
            </button>
          </li>
          <li className='nav-item'>
            <button onClick={handleLogout} className='btn btn-danger'>
              <FaSignOutAlt className='me-1'/> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminHeader;
