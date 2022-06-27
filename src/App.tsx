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
import Crop from 'pages/Care/Crop';
import AllCrops from 'pages/Care/AllCrops';
import Recipe from 'pages/Care/Recipe';
import Menu from 'pages/Menu/Menu';
import {RecoilRoot} from 'recoil';
import Review from 'pages/Review/Review';


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
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} />
          <div className='main'>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="home" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile username={username} setUsername={setUsername} />} />
              <Route path="home/review/:reviewId" element={<Review />} />
              <Route path="care" element={<Care />} />
              <Route path="crop" element={<Crop />} />
              <Route path="allcrops" element={<AllCrops />} />
              <Route path="recipe" element={<Recipe />} />
              <Route path="menu" element={<Menu />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;