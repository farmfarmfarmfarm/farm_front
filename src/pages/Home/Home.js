import React, { useState } from "react";
import MapNList from "components/kakaoMap/MapNList";
import { useRecoilState } from "recoil";
import { selectedLoc, selectedFarm, selectedPlace } from "../../Atom";
import { Link } from "react-router-dom";
import search from "assets/icons/search.png";
import "./Home.css";

const Home = () => {
  const [place, setPlace] = useRecoilState(selectedPlace);
  const [rcfarm, setRcfarm] = useState(null);
  console.log("중심위치", place);

  const formData = [
    { id: 1, name: "주말농장" },
    { id: 2, name: "치유농장" },
    { id: 3, name: "체험농장" },
  ];

  const checkHandler = ({ target }) => {
    setRcfarm(target.value);
  };

  return (
    <div className="home" style={{ padding: "0px 10px" }}>
      {place ? (
        <h3>
          <span style={{ fontSize: "23px" }}>{place}</span>에서 찾아보기
        </h3>
      ) : (
        <h3>지도에서 찾아보기</h3>
      )}
      <div className="farmcheck">
        <div className="contStyle">
        {formData.map((item) => (
          <div className="StFarmDiv" key={item.id}>
            <input
              className="StFarmInput"
              type="radio"
              value={item.name}
              id={item.id}
              name="farm"
              onChange={(e) => checkHandler(e)}
            />
            <label
              className="innerBox"
              htmlFor={item.id}
              style={{ cursor: "pointer" }}
            >
              <span style={{ fontSize: "12px" }}>{item.name}</span>
            </label>
          </div>
        ))}
      </div>
      </div>
      <MapNList rcfarm={rcfarm}/>
    </div>
  );
};
export default Home;
