import React, { useState } from 'react';
import './App.css';

function Nav(props) {
  return (
    <div className='Nav'>
      <div>소개</div>
      <div>지도에서 찾아보기</div>
      <div>농작물로 치유하기</div>
      <div>레시피</div>
    </div>
  );
}

export default Nav;