import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from 'pages/Main/Main';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import {authService} from 'pages/Login/fbase';
import Care from 'pages/Care/Care';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect( ()=>{
    authService.onAuthStateChanged((user) =>{
      if (user!==null){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      setInit(true); //firebase초기화 후 값변경. 초기화 후에야 auth 상태 확인 가능하니까.
    })
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="home/:loc/:farm" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile username={username} setUsername={setUsername} />} />
            <Route path="care" element={<Care />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;