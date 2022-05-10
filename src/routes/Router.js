import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Header from 'components/Header/Header';
import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';

function Router({isLoggedIn, setUsername, username}) {
    console.log("라우터에서,",username);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className='main'>
          <Routes>
            <Route path="/" element={<Home />} />
            {isLoggedIn ?  <Route path="/profile" element={<Profile setUsername={setUsername} username={username} />} />
                :  <Route path="/profile" element={ <Login setUsername={setUsername} />} /> }
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Router;
