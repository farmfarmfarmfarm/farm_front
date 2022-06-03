import React from "react";
import Chart from "./Chart";
import Check from "./Check";
import KakaoMap from './KakaoMap';
import KakaoMap2 from './KakaoMap2';
import LandingPage from "./LandingPages";
import MapNList from "./MapNList";

const Home =()=>{

    return(
        <>
            THIS IS HOME
            <h1>지도에서 찾아보기</h1>
            <KakaoMap2></KakaoMap2>
            <Chart></Chart>
            <Check></Check>
            <LandingPage />
            <MapNList />
        </>
    )
}
export default Home;