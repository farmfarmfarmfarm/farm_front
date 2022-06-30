import React, {useState} from 'react';
import Check from "pages/Home/Check";
import MapNList from "components/kakaoMap/MapNList";
import {useRecoilState} from 'recoil';
import {selectedLoc, selectedFarm, selectedPlace} from '../../Atom';
import { Link } from 'react-router-dom';
import search from 'assets/icons/search.png'
import './Home.css';

const Home =()=>{
    const [place, setPlace] = useRecoilState(selectedPlace);
    const [checkedItems, setcheckedItems] = useState(['주말농장']);
    console.log('중심위치',place);

    return(
        <div className='home'>  
            <h2>지도에서 찾아보기</h2>
            <span style={{fontSize: '11px', color: '#7c7c7c'}}>지도에서 농장의 이름을 누르면 농장에 대한 자세한 정보를 볼 수 있어요</span>
            <div className='farmcheck'>
            <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
            </div>
            <MapNList />
        </div>
    )
}
export default Home;