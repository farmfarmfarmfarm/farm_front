import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import {selectedLoc, selectedFarm} from '../../Atom';
import '../../pages/Home/Home.css';

const { kakao } = window

const MapNList = () => {
  const [rcloc, setRcloc] = useRecoilState(selectedLoc);
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm);
  const [resultLength, setLength] = useState(10);

  // 검색결과 배열에 담아줌
  const [Places, setPlaces] = useState([])
  useEffect(() => {
    console.log("RECOIL","중심좌표:", rcloc, "선택한농장",rcfarm);

    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('mapNList')
    const options = {
      center: new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x)),
      level: 1,
    }
    const map = new kakao.maps.Map(container, options)

    const ps = new kakao.maps.services.Places()
    for (let s=0; s<rcfarm.length; s++){
      ps.keywordSearch(rcfarm[s], placesSearchCB)
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

        let bounds = new kakao.maps.LatLngBounds()
        setLength(data.length);

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x))) //중심좌표 바꾸는 기능임. !입력한주소 좌표를 여기 넣어야할듯
        }

        map.setBounds(bounds)
        map.setLevel(10); //확대 정도 변경  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ISSUE

        setPlaces(data)
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
  }, [rcfarm])

    ////////////
    useEffect(()=>{
      let slider = document.querySelector(".slider");
      let innerSlider = document.querySelector(".slider-inner");
      let pressed = false;
      let startx;
      let x;
    
      slider.addEventListener("mousedown", e => {
        pressed = true
        startx = e.offsetX - innerSlider.offsetLeft
        slider.style.cursor = "grabbing"
      })
    
      slider.addEventListener("mouseenter", () => {
        slider.style.cursor = "grab"
      })
    
      slider.addEventListener("mouseup", () => {
        slider.style.cursor = "grab"
      })
    
      window.addEventListener("mouseup", () => {
        pressed = false
      })
    
      slider.addEventListener("mousemove", e => {
        if (!pressed) return
        e.preventDefault()
        x = e.offsetX
    
        innerSlider.style.left = `${x - startx}px`
        checkboundary()
      })
    
      function checkboundary() {
        let outer = slider.getBoundingClientRect()
        let inner = innerSlider.getBoundingClientRect()
    
        if (parseInt(innerSlider.style.left) > 0) {
          innerSlider.style.left = "0px"
        } else if (inner.right < outer.right) {
          innerSlider.style.left = `-${inner.width - outer.width}px`
        }
      }
    })
    ////////////////////

  return (
    <div>
      <div>
        <div
          id="mapNList"
          style={{
            width: '100%',
            height: '40vh',
          }}
        ></div>
      </div>
      <div className='slider'>
        <div className="slider-inner" style={{gridTemplateColumns: `repeat(${resultLength}, 1fr)`}}>
          {Places.map((item, i) => (
            <div key={i} style={i===0 ? {marginLeft: '16px'} : i===resultLength-1 ? {marginRigth : '16px'} :null} className='slider-item'>
              <div>
                <h5>{item.place_name}</h5>
                {item.road_address_name ? (
                  <div>
                    <span>{item.road_address_name}</span>
                    <span>{item.address_name}</span>
                  </div>
                ) : (
                  <span>{item.address_name}</span>
                )}
                <span>{item.phone}</span>
              </div>
            </div>
          ))}
          <div id="pagination"></div>
        </div>
      </div>
    </div>
  )
}

export default MapNList