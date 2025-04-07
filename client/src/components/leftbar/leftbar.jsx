// src/components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import './leftbar.css'; 

const LeftBar = () => {
    return (
      <div className="left-bar">
        <div className="left-bar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </div>
        <div className="left-bar-item">
          <i className="fas fa-search"></i>
          <span>Search</span>
        </div>
        <div className="left-bar-item">
          <i className="fas fa-list"></i>
          <span>Playlists</span>
        </div>
        <div className="left-bar-item">
          <i className="fas fa-plus"></i>
          <span>Create Playlist</span>
        </div>
      </div>
    );
  };
  
  export default LeftBar;