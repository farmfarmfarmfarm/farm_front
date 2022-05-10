import React, { useState } from 'react';
// import './App.css';
import { StHeader, StHeaderMain } from './style';
import logo from 'assets/icons/logo.jpg';
import login from 'assets/icons/login.png';
import {Link} from "react-router-dom";

function Header(props) {
  return (
    <StHeader>
      <StHeaderMain>
        <Link to="/"><img src={logo} alt="로고"></img></Link>
        <Link to="/profile"><img src={login} alt="로고"></img></Link>
      </StHeaderMain>

{/* -nav이름정하기 -css */}
        <nav id = "gnb">
          <ul className="gnb1">
            <li><Link to="/" className='gnb-intro' title="HOME">HOME</Link></li>
          </ul>
        </nav>

    </StHeader>
  );
}

export default Header;