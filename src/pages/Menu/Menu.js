import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import { Link } from 'react-router-dom';

const Home =()=>{

    return(
        <div className='home'>  
            <div>
                
            </div>
            <div><Link to='/carefarm'>치유농장 소개</Link></div>
            <div><Link to='/home'>지도에서 찾아보기</Link></div>
            <div><Link to='/allcrops'>작물 찾아보기</Link></div>
            <div><Link to='/care'>작물로 치유하기</Link></div>
        </div>
    )
}
export default Home;