import React, { useEffect, useState } from 'react'
import {useRecoilState} from 'recoil';
import '../../pages/Home/Home.css';
import {selectedLoc, selectedFarm, thisloc} from '../../Atom';
import axios from 'axios';
import listFarm from '../../assets/icons/listFarm.png';
import { useNavigate } from "react-router-dom";

const { kakao } = window

const MapNList = () => {
  const navigate = useNavigate();
  const [rcloc, setRcloc] = useRecoilState(selectedLoc); //설정한 중심위치 좌표
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm); //선택한 농장종류 ['주말농장', '치유농장', '체험농장']
  const [resultLength, setLength] = useState(10); //결과값 길이
  const [Places, setPlaces] = useState([])  // 검색결과 배열에 담아줌
  const [done, setDone] = useState(false);
  const [thislocation, setThislocation] = useRecoilState(thisloc);

  async function getData(cate) {
    // console.log(cate);
    await axios.get(`/api/farm/${cate}`).then(
      (res) => {
        setPlaces((Places) => []);
        res.data.data.forEach((e) =>{
          // console.log(e) //{id: 1, category: 'EXP', name: '가나안농장', reviews: Array(0), reviewRating: 0, …}
          setPlaces((prev)=>[...prev,{
            id: e.id,
            category: e.category,
            name: e.name,
            address: e.address,
            location_x: e.location_x,
            location_y: e.location_y,
            phone: e.phone,
          }]);
        });
        setDone(true);
      }
    )
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(() => {
    if (rcfarm==='주말농장') {getData('WKND');}
    else if (rcfarm==='치유농장') {getData('HEAL')}
    else if (rcfarm==='체험농장') {getData('EXP')}
    // console.log("RECOIL","중심좌표:", rcloc, "선택한농장",rcfarm);    
  }, [rcfarm])

  useEffect(() => {
    function handleIwClick(e) {
      console.log('--------------',e.target);
      axios.get(`/api/farm/findone/${e.target.id}`).then(
        (res) => {
          console.log('농장좌표!!!!!!!!!!,',res.data)
          setThislocation((prev) => ({
            ...prev,
            x: res.data.location_x,
            y: res.data.location_y,
          }))
        }
      )
      .catch((err)=>{
        console.log('ERR',err);
      })
      navigate(`review/${e.target.id}`)
    }
      // console.log(Places);
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
          // map: map, // 마커가 지도 위에 표시되도록 설정합니다
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new kakao.maps.InfoWindow({
            content: `<div class="iwTextDiv" id=${Places[i].id} style="
              display: block;
              background: #f7f7f7;
              color: black;
              border: 1px solid #86a889;
              text-align: center;
              height: 28px;
              line-height: 22px;
              border-radius: 4px;
              padding: 0px 10px;
              font-size: 11px;
            ">${Places[i].name}</div>`,
            position: markerPosition,
            map: map,
            clickable: true // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
        });
        var position = new window.kakao.maps.LatLng(37.586272, 127.029005);
        map.setCenter(position); //중심좌표 재설정
      }
      
      var infoTitle = document.querySelectorAll('.iwTextDiv');
      for (let i=0; i<infoTitle.length; i++){
        infoTitle[i].parentElement.parentElement.style.border = '0px';
        infoTitle[i].parentElement.parentElement.style.background = 'unset';
        infoTitle[i].parentElement.style.left = '35px';
        infoTitle[i].onclick = handleIwClick; //인포윈도우 클릭이벤트
        // infoTitle[i].parentElement.previousSibling.style.backgroundImage =
        // "url('https://user-images.githubusercontent.com/81412212/176420490-33d5fc07-3986-4014-b89e-23c30cbcd9c9.png')"; //꼭지
      }
    }
  );

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
  
  return (
    <div>
      <div>
        <div id="mapNList" style={{width: '100%',height: '40vh'}}></div>
      </div>
      <div className='slider'>
        <div className="slider-inner" style={{gridTemplateColumns: `repeat(${resultLength}, 1fr)`}}>
          {Places.map((item, i) => (
            <div key={i} style={i===0 ? {marginLeft: '16px'} : i===resultLength-1 ? {marginRigth : '16px'} :null} className='slider-item'>
                <div style={{display: 'grid', justifyContent: 'center', width: '200px'}}>
                  <div style={{marginBottom: '10px',display: 'flex', alignItems: 'center'}}>
                    <img style={{width: '50px', height: '50px', display: 'inline-block', marginRight: '20px'}} src={listFarm} alt="로고" />
                      <div style={{display: 'inline-block', fontSize: '20px'}}>{item.name}</div>
                  </div>
                  <div style={{color: '#5f5f5f'}}>🏡{item.address}</div>
                  <div style={{color: '#5f5f5f'}}>🌾{item.phone}</div>
                </div>              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MapNList