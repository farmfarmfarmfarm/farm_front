import React from "react";
import Map from "../../../pages/Home/Map";

function KakaoMap() {
  return (
    <div className="kakaomap"
      style={{position:"relative",width:"100%",height:"50vh"}}>
      <Map />
    </div>
  );
}

export default KakaoMap;