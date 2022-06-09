import React, {useState, useEffect} from "react";
import Chart from "./Chart";
import Check from "./Check";
import KakaoMap from './KakaoMap';
import KakaoMap2 from './KakaoMap2';
import LandingMapNList from "./LandingMapNList";
import {useParams} from "react-router-dom";

const Home =()=>{
    const { kakao } = window;

    const f= useParams();
    console.log('useparam',f.loc,f.farm);

    const [center, setCenter] = useState({x: 0, y:0});

    useEffect(() => {
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(f.loc, placesSearchCB)
        function placesSearchCB(data, status, pagination) {
            setCenter((prev) => ({
                ...prev,
                x: data[0].x,
                y: data[0].y
            })); // 첫번째 검색결과의 좌표를 center좌표로 한다.
        }
    }, []);

    return(
        <>
            THIS IS HOME_이거나중엔 nav에서 없애야됨. Main에서 위치, 농장 선택 후에 접근 가능
            <h1>지도에서 찾아보기</h1>
            <LandingMapNList loc={f.loc} farm={f.farm} center={center}/>

            {/* <KakaoMap2></KakaoMap2> */}
            <Chart></Chart>
        </>
    )
}
export default Home;