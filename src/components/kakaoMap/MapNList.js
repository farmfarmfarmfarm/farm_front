import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import '../../pages/Home/Home.css';
import {selectedLoc, selectedFarm, selectedPlace} from '../../Atom';
import axios from 'axios';
import dummy from './dummy.json';
const { kakao } = window

const MapNList = () => {
  const [rcloc, setRcloc] = useRecoilState(selectedLoc); //설정한 중심위치 좌표
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm); //선택한 농장종류 ['주말농장', '치유농장', '체험농장']
  const [resultLength, setLength] = useState(10); //결과값 길이
  const [Places, setPlaces] = useState([])  // 검색결과 배열에 담아줌
  let category, markerPosition;


  useEffect(() => {
    if (rcfarm[0]==='주말농장') {category='EXP'}
    else if (rcfarm[0]==='치유농장') {category='HEAL'}
    else if (rcfarm[0]==='체험농장') {category='WKND'}
    console.log("RECOIL","중심좌표:", rcloc, "선택한농장",rcfarm);
    
    axios.get(`/api/farm/${category}`).then(
      (res) => {
        res.data.data.forEach((e) =>{
          // console.log(e) //{id: 1, category: 'EXP', name: '가나안농장', reviews: Array(0), reviewRating: 0, …}
          setPlaces((prev)=>[...prev,{
            id: e.id,
            category: e.category,
            name: e.name,
            address: e.address,
            location_x: e.location_x,
            location_y: e.location_y,
          }]);

        });
      }
    )
    .catch((err)=>{
      console.log(err);
    })

    // //지도 움직일때 중심좌표 반환
    // kakao.maps.event.addListener(map, 'dragend', function() {        
    //   var latlng = map.getCenter(); 
    //   var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
    //   message += '경도는 ' + latlng.getLng() + ' 입니다';
    //   console.log( message);
    // });
    //

  }, [rcfarm])

  useEffect(() => {
    const container = document.getElementById('mapNList')
    const options = {
      center: new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x)), //검색좌표
      level: 10,
    }
    const map = new kakao.maps.Map(container, options);

    for(let i=0; i<Places.length; i++){



      // 마커 위치
      let markerPosition = new kakao.maps.LatLng(Places[i].location_y,Places[i].location_x);

      // 마커를 생성합니다 (핀 모양!)
      let marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map, // 마커가 지도 위에 표시되도록 설정합니다
      });

      // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var activeInfoWindow = '<div style="padding:5px;">Hello World!</div>';
      var unactiveInfoWindow = '<div style="padding:5px;">nooo!</div>';

      // //인포윈도우
      var infowindow = new window.kakao.maps.InfoWindow({
        content: activeInfoWindow,
      });
      // infowindow.open(map,marker); //(map,marker)하면 마커(핀)도 나타납니다.

      kakao.maps.event.addListener(marker, 'click', function () {

        /// 인포윈도우 클릭시 해당 카드가 중앙으로
        // let sliderinner = document.querySelector(".slider-inner");
        // sliderinner.style.left = `-${dummy.data[i].id*250 +5*dummy.data[i].id}px`;
      })
      
      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${dummy.data[i].name}</div>`
      });
      infowindow.open(map, marker);
    }
  }, [Places]);
  ////////////
  useEffect(()=>{
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []

      // var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // // 결과값으로 받은 위치를 마커로 표시합니다
      // var marker = new kakao.maps.Marker({
      //     map: map,
      //     position: coords
      // });
      // kakao.maps.event.addListener(marker, 'click', function () {

      //   /// 인포윈도우 클릭시 해당 카드가 중앙으로
      //   // let sliderinner = document.querySelector(".slider-inner");
      //   // sliderinner.style.left = `-${dummy.data[i].id*250 +5*dummy.data[i].id}px`;
      // })
      
      // // 인포윈도우로 장소에 대한 설명을 표시합니다
      // var infowindow = new kakao.maps.InfoWindow({
      //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${dummy.data[i].name}</div>`
      // });
      // infowindow.open(map, marker);

      // // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      // // map.setCenter(coords);
      // });
    
  }, []);

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
                <h5>{item.name}</h5>
                <span>{item.address}</span>
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