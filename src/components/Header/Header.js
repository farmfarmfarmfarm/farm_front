import React from 'react';
import { StHeader, StHeaderMain, StNav } from './style';
import logo from 'assets/icons/newlogo.jpg';
import login from 'assets/icons/login.png';
import menu from 'assets/icons/nav_bar.png'
import {Link} from "react-router-dom";

function Header({isLoggedIn}) {
  return (
    <StHeader>
      <StHeaderMain>
        <Link to="menu"><img style={{width: '60px', height:'60px'}} src={menu} alt="메뉴"></img></Link>
        <Link to="/"><img style={{width: '100px', height:'100px'}} src={logo} alt="로고"></img></Link>
        {isLoggedIn ? <Link to="/profile"><img style={{width: '30px', height:'30px'}} src={login} alt="프로필"></img></Link>
        : <Link to="/login"><img style={{width: '30px', height:'30px'}} src={login} alt="로그인"></img></Link> }
      </StHeaderMain>
    </StHeader>
  );
}

export default Header;