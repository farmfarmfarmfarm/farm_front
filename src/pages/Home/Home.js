import React from "react";
import Chart from "./Chart";
import Check from "./Check";
import KakaoMap from './KakaoMap';

const Home =()=>{

    return(
        <>
            THIS IS HOME
            <h1>지도에서 찾아보기</h1>
            <KakaoMap></KakaoMap>
            <Chart></Chart>
            <Check></Check>
        </>
    )
}
export default Home;