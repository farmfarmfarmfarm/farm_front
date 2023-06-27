import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import menu from "assets/icons/menu.png";
import listFarm from "assets/icons/listFarm.png";
import search from "assets/icons/search.png";
import nav3 from "assets/icons/nav3.png";
import nav4 from "assets/icons/nav4.png";
import { useRecoilState } from "recoil";
import { userId } from "../../Atom";
import "./Menu.css";

const Home = () => {
  const [rcUserId, setRcUserId] = useRecoilState(userId);
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const navigate = useNavigate();
  // console.log(rcUserId);

  return (
    <div className="home">
      <div className="menulogo">
        {rcUserId === 0 ? (
          <div className="before">
            <Link to="/login" style={{ color: "black" }}>
              로그인 해주세요 &gt;
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
        <button onClick={() => navigate(-1)} className="goback">
          X
        </button>
      </div>
      <div className="nav">
        <div className="dots">
          <div>●</div>
          <div>●</div>
          <div>●</div>
          <div>●</div>
        </div>
        <div className="navcontents">
          <div>
            <Link to="/careFarm" className="navtitle">
              <img className="navlogo" src={listFarm} />
              치유 농장 소개
            </Link>
          </div>
          <div>
            <Link to="/home" className="navtitle">
              <img className="navlogo" src={search} />
              지도에서 찾아보기
            </Link>
          </div>
          <div>
            <Link to="/care" className="navtitle">
              <img className="navlogo" src={nav3} />
              작물로 치유하기
            </Link>
          </div>
          <div>
            <Link to="/allcrops" className="navtitle">
              <img className="navlogo" src={nav4} />
              작물 찾아보기
            </Link>
          </div>
        </div>
        <div className="arrow">
          <div>&gt;</div>
          <div>&gt;</div>
          <div>&gt;</div>
          <div>&gt;</div>
        </div>
      </div>
    </div>
  );
};
export default Home;
