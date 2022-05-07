import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
