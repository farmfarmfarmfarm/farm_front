import React, { useState } from 'react';
import './App.css';

function Header(props) {
  return (
    <div>
      <header id='header'>
        <h1 className="ci"><a href="/" title="farmstory 메인으로 가기"><img src="img/logo.jpg" />farmstory</a></h1>
        <div className="link-area">
          <a href="/" className="btn-layer-sitemap" title="사이트맵">사이트맵</a>
          <a href="/" className="btn-layer-login" title="로그인 하기">로그인</a>
        </div>
        {/* link-area */}

        <nav id = "gnb">
          <ul className="gnb1">
            <li><a href="/" className='gnb-intro' title="소개">소개</a></li>
            <li><a href="/" className='gnb-map' title="지도">지도</a></li>
            <li><a href="/" className='gnb-care' title="진단">진단</a></li>
            <li><a href="/" className='gnb-recipe' title="레시피">레시피</a></li>
          </ul>
        </nav>
        {/* gnb */}

      </header>
    </div>
  );
}

export default Header;