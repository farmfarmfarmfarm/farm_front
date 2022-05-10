import React, { useEffect } from 'react';
import Map2 from "./Map2";

function KakaoMap2() {

    useEffect(() => {
        Map2();
    }, []);

    return (
        <div id='myMap' style={{
            position:"relative",
            width:"100%",
            height:"50vh"
        }}></div>
    );
}

export default KakaoMap2;