import React from 'react';
import LeftBar from "../../components/leftbar/leftbar";
import MediaPlayer from "../../components/mediaPlayer/mediaPlayer";
import SongContainer from '../../components/songContainer/songContainer';
import "./playlists.css";

const Playlists = () => {
    const playlist = {
      name: " PLAYLIST",
      description: "KareemAdel 3 - 24 songs",
      coverImage: "../../assets/images/playlist-cover.jpg",
      songs: [
        { id: 1, title: "move", artist: "Adam Port", album: "stryv", date: "6/07", likes: "+1000" },
        { id: 2, title: "party rock", artist: "LMFAO", album: "Sorry for Party Rocking", date: "1/01", likes: "+500" },
        { id: 3, title: "Back to Black", artist: "Amy Winehouse", album: "Back to Black", date: "27/10", likes: "+600" }
      ]
    };
    return (
        <div className="layout">
          <div className="content">
            <LeftBar />
    
            <main className="main-content">
              <header className="playlist-header"> {/* */}
                <div className="playlist-icon"> {/*  class name */}
                </div>
                <h1 className="playlist-title"> PLAYLIST</h1> {/*  title */}
                <div className="user-info">
                  <img 
                    src="../../assets/images/playlist-cover.jpg"  // Changed image path
                    alt="Playlist Cover" 
                    className="playlist-cover" //  class name
                  />
                  <div className="playlist-details"> {/*  class name */}
                    <p className="playlist-owner">KareemAdel</p> {/*  text */}
                    <p className="song-count">24 songs</p> {/*  count */}
                  </div>
                </div>
              </header>
              <SongContainer /> {/*  component */}
            </main>
            <MediaPlayer />
          </div>
        </div>
      );
    };
    

export default Playlists;