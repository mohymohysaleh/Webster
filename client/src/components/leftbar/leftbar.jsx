import React from 'react';
import { FaHome, FaSearch, FaList, FaPlus } from 'react-icons/fa';
import './leftbar.css';

const LeftBar = () => {
  return (
    <div className="left-bar">
      <div className="left-bar-item">
        <FaHome />
        <span > Home</span>
      </div>
      <div className="left-bar-item">
        <FaSearch />
        <span>  Search</span>
      </div>
      <div className="left-bar-item">
        <FaList />
        <span>  Playlists</span>
      </div>
      <div className="left-bar-item">
        <FaPlus />
        <span>  Create Playlist</span>
      </div>
    </div>
  );
};

export default LeftBar;
