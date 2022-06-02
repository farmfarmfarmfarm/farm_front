import React, { useEffect } from "react";

export const Navermap = () => {
    useEffect(() => {
      let map = null;
      const initMap = () => {
        const map = new naver.maps.Map("map", {
          center: new naver.maps.LatLng(37.511337, 127.012084),
          zoom: 13,
        });
      }
      initMap();
    }, []);
  
  //지도 사이즈 지정
    const mapStyle = {
      width: "100%",
      height: "50vh", //
    };
  
    return (
      <>
        <h2>지도 불러오기</h2>
        <div id="map" style={mapStyle}></div>
      </>
    );
  };