import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../../pages/Home/Home.css";
import { selectedLoc, selectedFarm, thisloc } from "../../Atom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import pin from "assets/icons/pin.png";
import call from "assets/icons/call.png";
const { kakao } = window;

const MapNList = (props) => {
  const { rcfarm } = props;
  const navigate = useNavigate();
  const [rcloc, setRcloc] = useRecoilState(selectedLoc); //설정한 중심위치 좌표
  const [resultLength, setLength] = useState(10); //결과값 길이
  const [Places, setPlaces] = useState([]); // 검색결과 배열에 담아줌
  const [done, setDone] = useState(false);
  const [thislocation, setThislocation] = useRecoilState(thisloc);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_DB_HOST + `/api/farms`)
      .then((res) => {
        setPlaces(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  async function getData(cate) {
    // console.log(cate);
    await axios
      .get(process.env.REACT_APP_DB_HOST + `/api/farms/category/${cate}`)
      .then((res) => {
        setPlaces(res.data);
        setDone(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (rcfarm === "주말농장") {
      getData("WKND");
    } else if (rcfarm === "치유농장") {
      getData("HEAL");
    } else if (rcfarm === "체험농장") {
      getData("EXP");
    }
  }, [rcfarm]);

  useEffect(() => {
    function handleIwClick(e) {
      axios
        .get(process.env.REACT_APP_DB_HOST + `/api/farms/${e.target.id}`)
        .then((res) => {
          setThislocation((prev) => ({
            ...prev,
            x: res.data.location_x,
            y: res.data.location_y,
          }));
        })
        .catch((err) => {
          console.log("ERR", err);
        });
      navigate(`review/${e.target.id}`);
    }

    const container = document.getElementById("mapNList");
    const options = {
      center: new kakao.maps.LatLng(parseFloat(rcloc.y), parseFloat(rcloc.x)), //검색좌표
      level: 10,
    };
    const map = new kakao.maps.Map(container, options);

    for (let i = 0; i < Places.length; i++) {
      // 마커 위치
      let markerPosition = new kakao.maps.LatLng(
        Places[i].location_y,
        Places[i].location_x
      );

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
              cursor: pointer;
            ">${Places[i].name}</div>`,
        position: markerPosition,
        map: map,
        clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      });
      var position = new window.kakao.maps.LatLng(
        parseFloat(rcloc.y),
        parseFloat(rcloc.x)
      );
      map.setCenter(position); //중심좌표 재설정
    }

    var infoTitle = document.querySelectorAll(".iwTextDiv");
    for (let i = 0; i < infoTitle.length; i++) {
      infoTitle[i].parentElement.parentElement.style.border = "0px";
      infoTitle[i].parentElement.parentElement.style.background = "unset";
      infoTitle[i].parentElement.style.left = "35px";
      infoTitle[i].onclick = handleIwClick; //인포윈도우 클릭이벤트
      // infoTitle[i].parentElement.previousSibling.style.backgroundImage =
      // "url('https://user-images.githubusercontent.com/81412212/176420490-33d5fc07-3986-4014-b89e-23c30cbcd9c9.png')"; //꼭지
    }
  });

  return (
    <div>
      <div style={{ fontSize: "11px" }}>검색 결과 {Places.length}개 </div>
      <span style={{ fontSize: "11px", color: "#7c7c7c" }}>
        지도에서 농장의 이름을 누르면 농장에 대한 자세한 정보를 볼 수 있어요
      </span>
      <div>
        <div id="mapNList" style={{ width: "100%", height: "40vh" }}></div>
      </div>
      <div style={{ marginTop: "1rem", color: "#020302" }}>
        가까운 농장 바로가기
      </div>
      <div>
        <div className="farmlist">
          {Places.map(
            (item, i) =>
              Math.abs(parseFloat(item.location_x) - parseFloat(rcloc.x)) <
                0.2 &&
              Math.abs(parseFloat(item.location_y) - parseFloat(rcloc.y)) <
                0.2 && (
                <div
                  key={i}
                  id={i}
                  style={
                    i === 0
                      ? { marginLeft: "16px" }
                      : i === resultLength - 1
                      ? { marginRigth: "16px" }
                      : null
                  }
                  className="slider-item"
                  onClick={() => navigate(`review/${item.id}`)}
                >
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      width: "200px",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{ display: "inline-block", fontSize: "20px" }}
                      >
                        {item.name}
                      </div>
                    </div>
                    <div
                      style={{ color: "#5f5f5f", display: "flex", gap: "2px" }}
                    >
                      <img
                        src={pin}
                        alt="📍"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                      <div>{item.address}</div>
                    </div>
                    <div
                      style={{ color: "#5f5f5f", display: "flex", gap: "2px" }}
                    >
                      <img
                        src={call}
                        alt="📞"
                        style={{ width: "1rem", height: "1rem" }}
                      />
                      <div>{item.phone}</div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default MapNList;
