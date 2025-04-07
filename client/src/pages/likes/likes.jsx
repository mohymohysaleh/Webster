import React from 'react';
import LeftBar from "../../components/leftbar/leftbar";
import MediaPlayer from "../../components/mediaPlayer/mediaPlayer";
import SongContainer from '../../components/songContainer/songContainer';
import { FaHeart} from 'react-icons/fa';

import "./Likes.css";

const Likes = () => {
  return (
    <div className="layout">
      <div className="content">
        <LeftBar />

        <main className="main-content">
          <header className="likes-header">
            <div className="likes-icon">
                <FaHeart/>
            </div>
            <h1 className="likes-title">Likes</h1>
            <div className="user-info">
              <img href="../../assets/images/IMG-20250320-WA0122.jpg" alt="Profile" className="profile-pic" />
              <div className="user-details">
                <p className="username">KareemAdel</p>
                <p className="song-count">34 songs</p>
              </div>
            </div>
          </header>
          <SongContainer />
        </main>
        <MediaPlayer />
      </div>
    </div>
  );
};

export default Likes;
