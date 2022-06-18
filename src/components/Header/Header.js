import React from 'react';
// import './App.css';
import { StHeader, StHeaderMain, StNav } from './style';
import logo from 'assets/icons/newlogo.jpg';
import login from 'assets/icons/login.png';
import menu from 'assets/icons/nav_bar.png'
import {Link} from "react-router-dom";

function Header({isLoggedIn}) {
  return (
    <StHeader>
      <StHeaderMain>
        <Link to="/"><img style={{width: '50px', height:'50px'}} src={menu} alt="메뉴"></img></Link>
        <Link to="/"><img style={{width: '70px', height:'70px'}} src={logo} alt="로고"></img></Link>
        {isLoggedIn ? <Link to="/profile"><img style={{width: '50px', height:'50px'}} src={login} alt="프로필"></img></Link>
        : <Link to="/login"><img style={{width: '50px', height:'50px'}} src={login} alt="로그인"></img></Link> }
      </StHeaderMain>
      <StNav id = "gnb">
          <li style={{listStyle: 'none',}}><Link to="/home" className='gnb-intro' title="HOME">HOME</Link></li>
          <li style={{listStyle: 'none',}}><Link to="/care" className='gnb-care' title="CARE">CARE</Link></li>
      </StNav>
    </StHeader>
  );
}

export default Header;