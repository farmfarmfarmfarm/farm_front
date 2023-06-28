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
    console.log('중심위치',place);

    return(
        <div className='home'>  
            {
                place?
                <h3><span style={{fontSize:'23px'}}>{place}</span>에서 찾아보기</h3>:
                <h3>지도에서 찾아보기</h3>
            }
            <div className='farmcheck'>
                <Check></Check>
            </div>
            <MapNList />
        </div>
    )
}
export default Home;