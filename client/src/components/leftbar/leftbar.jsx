import React from 'react';
import { FaHome, FaSearch, FaList, FaPlus, FaThumbsUp } from 'react-icons/fa';
import Home from "../../pages/home/home";
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Webster.png';
import './leftbar.css';

const navigationItems = [
  { icon: Home, label: "Home", href: "../../pages/home/home" }
  // Add other navigation items here if needed
];

const LeftBar = () => {
  return (
    <div className="left-bar">
      {/* <div className="logo">
        <img src={Logo} alt="Logo" />
      </div> */}

      <Link to="/home" className="left-bar-item">
        <FaHome />
        <span>Home</span>
      </Link>

      <Link to="/playlists" className="left-bar-item">
        <FaList />
        <span>Playlists</span>
      </Link>

      <Link to="/home" className="left-bar-item">
        <FaSearch />
        <span>Search</span>
      </Link>

      <Link to="/likes" className="left-bar-item">
        <FaThumbsUp />
        <span>Liked</span>
      </Link>

      <div className="left-bar-item">
        <FaPlus />
        <span>Create Playlist</span>
      </div>
    </div>
  );
};

export default LeftBar;
