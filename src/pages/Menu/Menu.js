import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import menu from "assets/icons/menu.png";
import listFarm from "assets/icons/listFarm.png";
import search from "assets/icons/search.png";
import nav3 from "assets/icons/nav3.png";
import nav4 from "assets/icons/nav4.png";
import rightArrow from "assets/icons/right_arrow.png";
import close from "assets/icons/close.png";
import { useRecoilState } from "recoil";
import { userId } from "../../Atom";
import "./Menu.css";

const Home = () => {
  const [rcUserId, setRcUserId] = useRecoilState(userId);
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const navigate = useNavigate();
  console.log(rcUserId);

  return (
    <div className="home">
      <div className="menulogo">
        <div className="mainlogo">Therapia</div>
        {rcUserId === 0 ? (
          <div className="before">
            <Link to="/login" style={{ color: "black" }}>
              로그인 해주세요 <img src={rightArrow} style={{ width: "15px" }} />
            </Link>
          </div>
        ) : (
          <div className="after">
            안녕하세요 .{" "}
            <h2 style={{ letterSpacing: "2px" }}>
              <b style={{ color: "#166d1e" }}>{nickname}</b>님
            </h2>
          </div>
        )}
        <img onClick={() => navigate(-1)} className="goback" src={close} />
      </div>
      <div className="nav">
        <div className="navcontents">
          <hr></hr>
          <div className="navcontent">
            <Link to="/careFarm" className="navtitle">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img className="navlogo" src={listFarm} />
                치유 농장 소개
              </div>
              <img className="right-arrow" src={rightArrow} />
            </Link>
          </div>
          <div className="navcontent">
            <Link to="/home" className="navtitle">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img className="navlogo" src={search} />
                지도에서 찾아보기
              </div>
              <img className="right-arrow" src={rightArrow} />
            </Link>
          </div>
          <div className="navcontent">
            <Link to="/care" className="navtitle">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img className="navlogo" src={nav3} />
                작물로 치유하기
              </div>
              <img className="right-arrow" src={rightArrow} />
            </Link>
          </div>
          <div className="navcontent">
            <Link to="/allcrops" className="navtitle">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img className="navlogo" src={nav4} />
                작물 찾아보기
              </div>
              <img className="right-arrow" src={rightArrow} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
