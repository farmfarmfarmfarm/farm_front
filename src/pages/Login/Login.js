import React from "react";
import { authService } from "./fbase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useRecoilState } from "recoil";
import { userId } from "../../Atom";

const Login = () => {
  const navigate = useNavigate();
  const [rcUserId, setRcUserId] = useRecoilState(userId);

  const onSocialClick = async (e) => {
    let provider;
    provider = new GoogleAuthProvider();
    const data = await signInWithPopup(authService, provider); //auth 가능
    // console.log('유저식별id',data.user);
    localStorage.setItem("nickname", data.user.displayName);
    postData(data.user.displayName, data.user.email);
    navigate("/");
  };
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  async function postData(nickname, email) {
    try {
      //응답 성공
      const response = await axios.post(
        process.env.REACT_APP_DB_HOST+`/api/members`,
        JSON.stringify({ nickname, email }),
        { headers } // 500에러
      );
      console.log(response.data);
      setRcUserId(response.data.id);
      localStorage.setItem("userId", response.data.id);
      console.error("로그인", response.data.id);
    } catch (error) {
      //응답 실패
      console.error("로그인실패", error);
    }
  }
  return (
    <div className="login" style={{ marginTop: "20px" }}>
      <div className="subtitle" style={{ color: "#166d1e" }}>
        신개념 농장 플랫폼
      </div>
      <h3 style={{ color: "#226f29" }}>테라피아</h3>
      <div>
        <div style={{ marginTop: "40px" }}>
          <button
            className="login-btn"
            name="google"
            onClick={onSocialClick}
            style={{ cursor: "pointer" }}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
