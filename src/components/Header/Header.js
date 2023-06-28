import React from "react";
import { StHeader, StHeaderMain, StNav } from "./style";
import logo from "assets/icons/newlogo.jpg";
import login from "assets/icons/login.png";
import menu from "assets/icons/nav_bar.png";
import { Link } from "react-router-dom";

function Header({ isLoggedIn }) {
  if (window.location.hash === '#/menu') return null;

  return (
    <StHeader>
      <StHeaderMain>
        <Link to="menu" style={{ width: "60px", height: "60px" }}>
          <img
            style={{ width: "60px", height: "60px" }}
            src={menu}
            alt="메뉴"
          ></img>
        </Link>
        <Link to="/" style={{ textDecoration: "none"}}>
          <h3 className="mainlogo" style={{marginTop:"0"}}>Therapia</h3>
        </Link>
        {isLoggedIn ? (
          <Link
            to="/profile"
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={login} alt="프로필"></img>
          </Link>
        ) : (
          <Link
            to="/login"
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src={login}
              alt="로그인"
            ></img>
          </Link>
        )}
      </StHeaderMain>
    </StHeader>
  );
}

export default Header;
