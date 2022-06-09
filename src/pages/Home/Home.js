import React from "react";
import Chart from "./Chart";
import Check from "./Check";
import KakaoMap from './KakaoMap';
import KakaoMap2 from './KakaoMap2';
import LandingMapNList from "./LandingMapNList";
import {useParams} from "react-router-dom";

const Home =()=>{
    const f= useParams();
    console.log('useparam',f);
    return(
        <>
            THIS IS HOME_이거나중엔 nav에서 없애야됨. Main에서 위치, 농장 선택 후에 접근 가능
            <h1>지도에서 찾아보기</h1>
            <LandingMapNList />

            {/* <KakaoMap2></KakaoMap2> */}
            <Chart></Chart>
        </>
    )
}
export default Home;