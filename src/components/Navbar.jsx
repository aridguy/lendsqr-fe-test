import React from 'react';
// import './Navbar.scss';
import { FaBell, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar-wrapper d-flex align-items-center justify-content-between px-4 py-2">
      {/* Left: Search Bar */}
      <div className="search-container d-flex align-items-center">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search for anything"
        />
      </div>

      {/* Right: User Section */}
      <div className="user-section d-flex align-items-center gap-4">
        <FaBell className="icon bell" />

        <div className="user-info d-flex align-items-center gap-2">
          <span className="username">Adedeji</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="avatar"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
