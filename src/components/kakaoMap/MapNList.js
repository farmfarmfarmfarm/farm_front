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
  const [resultLength, setLength] = useState(0); //결과값 길이
  const [Places, setPlaces] = useState([])  // 검색결과 배열에 담아줌

  //api

  const [resAddress, setResAddress] = useState([]);
  useEffect(() => {
    console.log("RECOIL","중심좌표:", rcloc, "선택한농장",rcfarm);
    
    axios.get('/api/farm/EXP').then(
      (res) => {
        console.log(res);
      }
    )
    /// api
    // for (let i=0;i<10;i++){
    //   axios.get('/api/farm/EXP').then(
    //     (res) => {
    //       console.log(res);
    //       setResAddress((prev)=>[...prev,{
    //         id: 1,
    //         category: 'EXP',
    //         name: '머머농장',
    //         address: res.data.data[i].address
    //       }]);
    //     },
    //   )
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    // }

    //dummy
    // for (let i=0;i<10;i++){
    //   setResAddress((prev)=>[...prev,{
    //   id: dummy.data[i].id,
    //   category: dummy.data[i].category,
    //   name: dummy.data[i].name,
    //   address: dummy.data[i].address,
    //   }]);
    // }
    // console.log(resAddress);

    // //지도 움직일때 중심좌표 반환
    // kakao.maps.event.addListener(map, 'dragend', function() {        
    //   var latlng = map.getCenter(); 
    //   var message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
    //   message += '경도는 ' + latlng.getLng() + ' 입니다';
    //   console.log( message);
    // });
    //

  }, [rcfarm])
  ////////////
  useEffect(()=>{
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })
    var markers = []
    const container = document.getElementById('mapNList')
    const options = {
      center: new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x)),
      level: 10,
    }
    const map = new kakao.maps.Map(container, options)
    const geocoder = new kakao.maps.services.Geocoder();

    for (let i=0;i<10;i++){
      let distance;
      // console.log('useEffect안에선',resAddress);
      // console.log(resAddress[i].name);
      geocoder.addressSearch(dummy.data[i].address, function(result, status) {
      // 정상적으로 검색이 완료됐으면 
     if (status === kakao.maps.services.Status.OK) {
      
      distance = Math.sqrt(Math.pow(result[0].y-rcloc.y,2) + Math.pow(result[0].x-rcloc.x, 2));
      if (distance <2){ //////////////////기준어케할지
        setPlaces((prev) => [...prev,{
          id: dummy.data[i].id,
          name: dummy.data[i].name,
          address: dummy.data[i].address,
          phone: dummy.data[i].phone,
        }])
        setLength((prev)=>prev+1);
      }
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

      // 결과값으로 받은 위치를 마커로 표시합니다
      var marker = new kakao.maps.Marker({
          map: map,
          position: coords
      });

      // 인포윈도우로 장소에 대한 설명을 표시합니다
      var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px 0;">${dummy.data[i].name}</div>`
      });
      infowindow.open(map, marker);

      // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      // map.setCenter(coords);
      }
      });
    }
  }, [resAddress])

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