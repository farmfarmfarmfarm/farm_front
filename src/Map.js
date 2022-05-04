import React, { useEffect } from "react";
import { markerdata } from "./markerData";
import './App.css';

const {kakao} = window

function Map() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };

    const map = new kakao.maps.Map(container, options);

    markerdata.forEach((props) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(props.lat, props.lng),
      });
      const infowindow = new kakao.maps.InfoWindow({
        content: props.title,
      });

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    });

    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }
  };

  return <div id="map"></div>;
}

export default Map;