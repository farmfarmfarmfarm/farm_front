import React, {useState, useEffect} from 'react';
import { PieChart } from "react-minimal-pie-chart";
import { Chartcontainer, Chartitem } from 'components/Header/style';
import {useRecoilState} from 'recoil';
import {ratingAvg, thisloc} from '../../Atom';
import { getDistance } from 'geolib';
import './Review.css';
import { useNavigate } from "react-router-dom";

const Chart = () => {
  const navigate = useNavigate();
  const [thislocation, setThislocation] = useRecoilState(thisloc);
  const [stdistance, setstdistance] = useState(null);
  const [rateAvg, setRateAvg] = useRecoilState(ratingAvg);

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    setstdistance((getDistance(
      { latitude: latitude, longitude: longitude },
      { latitude: thislocation.y, longitude: thislocation.x}
    )/1000).toFixed(2));
  }

  function error() {
    alert('사용자 위치를 찾을 수 없습니다.') ;
    navigate(`/`)
  }

  if(!navigator.geolocation) {
    alert('Geolocation is not supported by your browser') ;
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }

  const locdistance = (300-(stdistance))/300*100;
  const distance = (rateAvg)/5*100;
  const avgdistance = ((locdistance+distance)/2).toFixed(2);


  return (
    <div>
      <div className='Chartcontainer'>
        <PieChart className="piechart"
          data={[
            {
              value: stdistance,
              color: "#C0D993", 
              name: "reviewrating",
            },
          ]}
          reveal= {locdistance}
          lineWidth={30}
          background="#f3f3f3"
          lengthAngle={360}
          // animate
          startAngle={-90}
          label={({dataEntry}) => dataEntry.value+'km'}
          labelStyle ={{
            fontSize: "20px", 
            fill: "#33333",
          }}
          labelPosition={0}
        />
        <PieChart className="piechart"
          data={[
            {
              value: rateAvg,
              color: "#A5C38C", 
              name: "reviewrating",
            },
          ]}
          reveal= {distance}
          lineWidth={30}
          background="#f3f3f3"
          lengthAngle={360}
          // animate
          startAngle={-90}
          label={({dataEntry}) => dataEntry.value}
          labelStyle ={{
            fontSize: "20px", 
            fill: "#33333",
          }}
          labelPosition={0}
        />
        <PieChart className="piechart"
          data={[
            {
              value: avgdistance,
              color: "#8AAD87", 
              name: "reviewrating",
            },
          ]}
          reveal= {Number(avgdistance)}
          lineWidth={30}
          background="#f3f3f3"
          lengthAngle={360}
          // animate
          startAngle={-90}
          label={({dataEntry}) => dataEntry.value+'%'}
          labelStyle ={{
            fontSize: "20px", 
            fill: "#33333",
          }}
          labelPosition={0}
        />
      </div>
      <div className='pieInfo'>
          <h4 className="piename">거리</h4>
          <h4 className="piename">평점</h4>
          <h4 className="piename">추천도</h4>
      </div>
      {
        (Number(distance)==0) ? <p style={{marginTop:'10px', fontSize:'25px'}}>아직 <b>리뷰가 없어요!</b></p> : (Number(avgdistance) >70) ? <p style={{marginTop:'10px', fontSize:'25px'}}>이 농장 <b>추천해요!</b></p> : <p style={{marginTop:'10px', fontSize:'25px'}}>이 농장 <b>추천하지 않아요!</b></p>
      }
    </div>
  );
};

export default Chart;