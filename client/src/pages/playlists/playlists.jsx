import React from 'react';
import LeftBar from "../../components/leftbar/leftbar";
import MediaPlayer from "../../components/mediaPlayer/mediaPlayer";
import "./playlists.css";

const Playlists = () => {
  return (
    <div className="layout">
      <div className="content">
        <LeftBar />

        <MediaPlayer />
      </div>
    </div>
  );
};

export default Playlists;
