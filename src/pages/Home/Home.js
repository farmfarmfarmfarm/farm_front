import React from "react";
import Chart from "./Chart";
import Check from "./Check";
import KakaoMap from './KakaoMap';
import KakaoMap2 from './KakaoMap2';
import LandingMapNList from "./LandingMapNList";

const Home =()=>{

    return(
        <>
            THIS IS HOME
            <h1>지도에서 찾아보기</h1>
            <KakaoMap2></KakaoMap2>
            <Chart></Chart>
            <LandingMapNList />
        </>
    )
}
export default Home;