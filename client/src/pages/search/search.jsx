import React from 'react';
import LeftBar from "../../components/leftbar/leftbar";
import MediaPlayer from "../../components/mediaPlayer/mediaPlayer";
import "./search.css";

const Search = () => {
  return (
    <div className="layout">
      <div className="content">
        <LeftBar />

        <MediaPlayer />
      </div>
    </div>
  );
};

export default Search;
