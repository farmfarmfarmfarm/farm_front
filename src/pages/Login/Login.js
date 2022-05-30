import React from "react";
import { authService } from './fbase';
import {signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate();
    const onSocialClick = async(e)=>{
        let provider;
        provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider); //auth 가능
        console.log('유저식별id',data.user.uid);
        localStorage.setItem('nickname', data.user.displayName);
        navigate("/");
    }

    return(
        <>
            THIS IS LOGIN
            <div>로그인하세요 로그인하세요</div>
            <div>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
            </div>
        </div>
        </>
    )
}
export default Login;
