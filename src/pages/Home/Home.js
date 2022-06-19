import React from "react";
import Chart from "./Chart";
import MapNList from "components/kakaoMap/MapNList";

const Home =()=>{

    return(
        <>
            {/* THIS IS HOME_이거나중엔 nav에서 없애야됨. Main에서 위치, 농장 선택 후에 접근 가능 */}
            <h2>지도에서 찾아보기</h2>
            <MapNList />
            <Chart></Chart>
        </>
    )
}
export default Home;