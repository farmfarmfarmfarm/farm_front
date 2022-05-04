import React, { useState } from 'react';
import './App.css';

function Header(props) {
  return (
    <div className='Header'>
      <h1 class="ci"><a href="/" title="farmstory 메인으로 가기">farmstory</a></h1>
      <div class="util-area">
        <div class="left-link">
          <a href="https://www.megabox.co.kr/benefit/viplounge" title="VIP LOUNGE">VIP LOUNGE</a>
          <a href="https://www.megabox.co.kr/benefit/membership" title="멤버십">멤버십</a>
          <a href="https://www.megabox.co.kr/support" title="고객센터">고객센터</a>
        </div>
        <div class="right-link">
          <div class="before">
            <a href="javaScript:fn_viewLoginPopup('default','pc')" title="로그인">로그인</a>
            <a href="https://www.megabox.co.kr/join" title="회원가입">회원가입</a>
            <a href="https://www.megabox.co.kr/booking">빠른예매</a>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default Header;