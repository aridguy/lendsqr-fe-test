import React, { useEffect, useState } from 'react'
import Logo from '../Asset/logo.svg'
import {
  FaBriefcase,
  FaUsers,
  FaUser,
  FaMoneyBill,
  FaCog,
  FaChartBar,
  FaCheck,
  FaBuilding,
  FaFileAlt,
  FaBars,
  FaBell,
  FaSearch
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
// import './DashboardLayout.scss';

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      // If no token, redirect to login
      navigate('/')
    }
  }, [navigate])

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then(result => {
      if (result.isConfirmed) {
        // Clear token and navigate
        localStorage.removeItem('token')
        Swal.fire(
          'Logged Out',
          'You have been logged out successfully.',
          'success'
        )
        navigate('/')
      }
    })
  }

  return (
    <div className='dashboard-layout'>
      {/* Navbar */}
      <nav className='navbar navbar-expand-lg bg-white shadow-sm px-4 py-2'>
        <div className='container-fluid d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center gap-3'>
            <FaBars className='menu-toggle me-3' onClick={toggleSidebar} />
            <img src={Logo} alt='logo-here' className='me-2 display-6' />

            {/* Bootstrap Hamburger Toggler */}
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
          </div>

          {/* Collapsible navbar content */}
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <div className='d-lg-flex align-items-center w-100 justify-content-between'>
              {/* Search Box */}
              <div className='search-box d-flex align-items-center bg-light px-3 py-1 rounded'>
                <FaSearch className='search-icon text-muted me-2' />
                <input
                  type='text'
                  className='form-control border-0 bg-light'
                  placeholder='Search for anything'
                />
              </div>

              {/* Right section: user + bell */}
              <div className='right d-flex align-items-center gap-3 mt-3 mt-lg-0'>
                <FaBell className='icon text-muted' />
                <span className='username fw-semibold'>Adedeji</span>
                <img
                  src='https://i.pravatar.cc/40'
                  alt='User'
                  className='avatar rounded-circle'
                  style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                />
                <span
                  className='username fw-semibold cursor'
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar + Main Content */}
      <div className='main d-flex'>
        {/* Sidebar */}
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
          <div className='sidebar-top'>
            {!collapsed && (
              <div className='org-switch'>
                <FaBriefcase />
                <span>Switch Organization</span>
              </div>
            )}
          </div>

          <ul className='nav-list'>
            <li className='nav-item active'>
              <FaChartBar /> {!collapsed && <span>Dashboard</span>}
            </li>
            {!collapsed && <p className='section'>CUSTOMERS</p>}
            <li className='nav-item'>
              <FaUsers />
              <span>{!collapsed && 'Users'}</span>
            </li>
            <li className='nav-item'>
              <FaUser />
              <span>{!collapsed && 'Guarantors'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Loans'}</span>
            </li>
            <li className='nav-item'>
              <FaFileAlt />
              <span>{!collapsed && 'Decision Models'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Savings'}</span>
            </li>
            <li className='nav-item'>
              <FaFileAlt />
              <span>{!collapsed && 'Loan Requests'}</span>
            </li>
            <li className='nav-item'>
              <FaCheck />
              <span>{!collapsed && 'Whitelist'}</span>
            </li>
            <li className='nav-item'>
              <FaChartBar />
              <span>{!collapsed && 'Karma'}</span>
            </li>
            {!collapsed && <p className='section'>BUSINESSES</p>}
            <li className='nav-item'>
              <FaBuilding />
              <span>{!collapsed && 'Organization'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Loan Products'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Saving Products'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Fees and Charges'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Transactions'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Services'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Service Account'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Settlements'}</span>
            </li>
            <li className='nav-item'>
              <FaFileAlt />
              <span>{!collapsed && 'Reports'}</span>
            </li>
            {!collapsed && <p className='section'>SETTINGS</p>}
            <li className='nav-item'>
              <FaCog />
              <span>{!collapsed && 'Preferences'}</span>
            </li>
            <li className='nav-item'>
              <FaMoneyBill />
              <span>{!collapsed && 'Fees and Pricing'}</span>
            </li>
            <li className='nav-item'>
              <FaFileAlt />
              <span>{!collapsed && 'Audit Logs'}</span>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className='main-content'>
          {children || <h2>Welcome to your dashboard!</h2>}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
