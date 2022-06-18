import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import '../../pages/Home/Home.css';
import {selectedLoc, selectedFarm, selectedPlace} from '../../Atom';

const { kakao } = window

const MapNList = () => {
  const [rcloc, setRcloc] = useRecoilState(selectedLoc);
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm);
  const [resultLength, setLength] = useState(10);
  const [place, setPlace] = useRecoilState(selectedPlace);

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
      ps.keywordSearch(rcfarm[s], placesSearchCB,{
        radius : 15000,
        location: new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x)),
      })
    }

    //
    // 커스텀 오버레이에 표시할 내용입니다     
    // HTML 문자열 또는 Dom Element 입니다 
    var content = '<div class ="label">카카오!</div>';

    // 커스텀 오버레이가 표시될 위치입니다 
    var position = new kakao.maps.LatLng(33.450701, 126.570667);  

    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content   
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
    //

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

        let bounds = new kakao.maps.LatLngBounds()
        setLength(data.length);

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i],i)
          // bounds.extend(new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x))) //중심좌표 바꾸는 기능임. !입력한주소 좌표를 여기 넣어야할듯
        }

        // map.setBounds(bounds)
        map.setLevel(8); //확대 정도 변경  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!ISSUE
        setPlaces(data)
      }
    }

    function displayMarker(place, i) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })
      
      // 커스텀 오버레이에 표시할 내용입니다     
      // HTML 문자열 또는 Dom Element 입니다 
      var content = '<div class="iwDiv">카카오!</div>';

      // 커스텀 오버레이가 표시될 위치입니다 
      var position = new kakao.maps.LatLng(place.y, place.x);  

      // 커스텀 오버레이를 생성합니다
      var customOverlay = new kakao.maps.InfoWindow({
          position: position,
          content: content   
      });

      // 커스텀 오버레이를 지도에 표시합니다
      customOverlay.setMap(map);
      //

      kakao.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<div style="padding:5px;font-size:8px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)

        /// 인포윈도우 클릭시 해당 카드가 중앙으로
        let sliderinner = document.querySelector(".slider-inner");
        sliderinner.style.left = `-${i*250 +5*i}px`;
      })
    }

    //지도 움직일때 중심좌표 반환
    kakao.maps.event.addListener(map, 'dragend', function() {        
      var latlng = map.getCenter(); 
      var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';
      console.log( message);
    });
    //

    var infoTitle = document.querySelectorAll('.iwDiv');
    console.log(infoTitle);
    infoTitle.forEach(function(e) {
      console.log(e);
      var w = e.offsetWidth + 10;
      var ml = w/2;
      e.parentElement.style.width = w;  
      // e.parentElement.style.top = "82px";
      e.parentElement.style.position = "relative";
      // e.parentElement.style.left = "50%";
      // e.parentElement.style.marginLeft = -ml+"px";
      // e.parentElement.style.width = w+"px";
      // e.parentElement.previousSibling.style.display = "none"; //꼭지
      if (e.className.includes('unactive')){
        e.parentElement.previousSibling.style.backgroundImage = "url('https://user-images.githubusercontent.com/81412212/174342201-0ec0c927-97f1-49dd-8c23-d6a872d9dfad.png')"; //꼭지
      } else {
        e.parentElement.previousSibling.style.backgroundImage = "url('https://user-images.githubusercontent.com/81412212/174341207-bbaa6a46-2d67-4731-8a51-9a429488affa.png')"; //꼭지
      }
      // e.parentElement.parentElement.style.width = 105; //부모(기본인포윈도우영역)
      e.parentElement.parentElement.style.display = "flex"; //부모(기본인포윈도우영역)
      e.parentElement.parentElement.style.background = "none"; //부모(기본인포윈도우영역)
      e.parentElement.parentElement.style.border = "none"; //부모(기본인포윈도우영역)
      e.parentElement.parentElement.style.justifyContent = "center"; //부모(기본인포윈도우영역)
      // e.parentElement.parentElement.style.border = "0px";
      // e.parentElement.parentElement.style.background = "unset";
    });
  }, [])

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