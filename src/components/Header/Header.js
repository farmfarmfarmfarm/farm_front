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
        <Link to="/profile"><img src={login} alt="로그인"></img></Link>
      </StHeaderMain>

{/* -nav이름정하기 -css */}
        <nav id = "gnb">
          <ul className="gnb1">
            <li><Link to="/home" className='gnb-intro' title="HOME">HOME</Link></li>
            <li><Link to="/login" className='gnb-login' title="LOGIN">LOGIN</Link></li>
            <li><Link to="/care" className='gnb-care' title="CARE">CARE</Link></li>
          </ul>
        </nav>

    </StHeader>
  );
}

export default Header;