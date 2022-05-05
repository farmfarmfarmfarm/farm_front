import React, { useState } from 'react';
import './App.css';

function Header(props) {
  return (
    <div id='header'>
      <h1 className="ci"><a href="/" title="farmstory 메인으로 가기">
        <img src="img/logo.jpg" />farmstory
      </a></h1>
      <div className="link-area">
        <a href="/" className="header-open-layer btn-layer-sitemap" title="사이트맵">사이트맵</a>
        <a href="/" className="header-open-layer btn-layer-login" title="로그인 하기">로그인</a>
      </div>
    </div>
  );
}

export default Header;