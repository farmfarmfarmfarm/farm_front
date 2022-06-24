import React from "react";
import { authService } from './fbase';
import {signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Login.css';

const Login = ()=>{
    const navigate = useNavigate();
    const onSocialClick = async(e)=>{
        let provider;
        provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider); //auth 가능
        console.log('유저식별id',data.user);
        postData(data.user.displayName, data.user.email);
        localStorage.setItem('nickname', data.user.displayName);
        navigate("/");
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    async function postData({nickname, email}) {
        try {
          //응답 성공 
          const response = await axios.post('api/member/add',
            JSON.stringify({nickname, email}),
            { headers }// 500에러
          );
          console.log('로그인POST', response);
          console.log('회원번호리턴', response.memberid);
        } catch (error) {
          //응답 실패
          console.error(error);
        }
      }
    return(
        <>
            THIS IS LOGIN
            <div>로그인하세요 로그인하세요</div>
            <div>
            <button onClick={postData}>크을릭</button>    
            <div>
                <button className='login-btn' name="google" onClick={onSocialClick}>Continue with Google</button>
            </div>
        </div>
        </>
    )
}
export default Login;
