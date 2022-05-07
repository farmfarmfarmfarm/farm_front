import React, { useState } from 'react';
// import './App.css';
import { StHeader, StHeaderMain } from './style';
import logo from 'assets/icons/logo.jpg';
import login from 'assets/icons/login.png';

function Header(props) {
  return (
    <StHeader>
      <StHeaderMain>
        <img src={logo} alt="로고"></img>
        <img src={login} alt="로고"></img>
      </StHeaderMain>

{/* -nav이름정하기 -라우터로 연결하기 -css */}
        <nav id = "gnb">
          <ul className="gnb1">
            <li><a href="/" className='gnb-intro' title="소개">소개</a></li>
            <li><a href="/" className='gnb-map' title="지도">지도</a></li>
            <li><a href="/" className='gnb-care' title="진단">진단</a></li>
            <li><a href="/" className='gnb-recipe' title="레시피">레시피</a></li>
          </ul>
        </nav>

    </StHeader>
  );
}

export default Header;



//헤더 내용들 왜안뜨냐