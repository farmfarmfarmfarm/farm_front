import React from 'react';
// import './App.css';
import { StHeader, StHeaderMain, StNav } from './style';
import logo from 'assets/icons/newlogo.jpg';
import login from 'assets/icons/login.png';
import {Link} from "react-router-dom";

function Header({isLoggedIn}) {
  return (
    <StHeader>
      <StHeaderMain>
        <Link to="/"><img style={{border: '1px solid black'}} src={logo} alt="로고"></img></Link>
        {isLoggedIn ? <Link to="/profile"><img src={login} alt="프로필"></img></Link>
        : <Link to="/login"><img src={login} alt="로그인"></img></Link> }
      </StHeaderMain>
      <StNav id = "gnb">
        {/* <ul className="gnb1"> */}
          <li style={{listStyle: 'none',}}><Link to="/home" className='gnb-intro' title="HOME">HOME</Link></li>
          <li style={{listStyle: 'none',}}><Link to="/care" className='gnb-care' title="CARE">CARE</Link></li>
        {/* </ul> */}
      </StNav>
    </StHeader>
  );
}

export default Header;