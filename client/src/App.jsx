import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Likes from './pages/likes/likes';  
import Home from './pages/home/home';  
import Playlists from './pages/playlists/playlists';
import Search from './pages/search/search';


function App() {
  return (
    <Router>
      <div className="app">  {}
        <Routes>
          <Route path="/likes" element={<Likes />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playlists"element={<Playlists/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;