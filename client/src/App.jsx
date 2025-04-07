import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Likes from './pages/likes/likes';  

function App() {
  return (
    <Router>
      <div className="app">  {}
        <Routes>
          <Route path="/likes" element={<Likes />} />
          <Route path="/" element={<Navigate to ="/likes" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;