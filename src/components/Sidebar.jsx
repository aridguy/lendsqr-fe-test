import React, { useState } from 'react';
// import './Sidebar.scss';
import {
  FaBriefcase, FaUsers, FaUser, FaMoneyBill, FaCog,
  FaChartBar, FaCheck, FaBuilding, FaFileAlt, FaBars
} from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <div className="toggle-icon" onClick={toggleSidebar}>
          <FaBars />
        </div>
        {!collapsed && (
          <div className="org-switch">
            <FaBriefcase />
            <span>Switch Organization</span>
          </div>
        )}
      </div>

      <ul className="nav-list">
        <li className="nav-item active">
          <FaChartBar />
          {!collapsed && <span>Dashboard</span>}
        </li>

        {!collapsed && <p className="section">CUSTOMERS</p>}
        <li className="nav-item"><FaUsers /><span> {!collapsed && 'Users'}</span></li>
        <li className="nav-item"><FaUser /><span> {!collapsed && 'Guarantors'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Loans'}</span></li>
        <li className="nav-item"><FaFileAlt /><span> {!collapsed && 'Decision Models'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Savings'}</span></li>
        <li className="nav-item"><FaFileAlt /><span> {!collapsed && 'Loan Requests'}</span></li>
        <li className="nav-item"><FaCheck /><span> {!collapsed && 'Whitelist'}</span></li>
        <li className="nav-item"><FaChartBar /><span> {!collapsed && 'Karma'}</span></li>

        {!collapsed && <p className="section">BUSINESSES</p>}
        <li className="nav-item"><FaBuilding /><span> {!collapsed && 'Organization'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Loan Products'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Saving Products'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Fees and Charges'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Transactions'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Services'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Service Account'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Settlements'}</span></li>
        <li className="nav-item"><FaFileAlt /><span> {!collapsed && 'Reports'}</span></li>

        {!collapsed && <p className="section">SETTINGS</p>}
        <li className="nav-item"><FaCog /><span> {!collapsed && 'Preferences'}</span></li>
        <li className="nav-item"><FaMoneyBill /><span> {!collapsed && 'Fees and Pricing'}</span></li>
        <li className="nav-item"><FaFileAlt /><span> {!collapsed && 'Audit Logs'}</span></li>
      </ul>
    </div>
  );
};

export default Sidebar;
