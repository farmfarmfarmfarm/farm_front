import React, {useState} from "react";
import { authService } from "pages/Login/fbase";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';
import '../Login/Login.css';

const Profile =({username,setUsername})=>{
    const [rcUserId, setRcUserId] = useRecoilState(userId);
    const [user, setUser] = useState(localStorage.getItem('userId')); //회원번호이렇게 가져다씀

    const [nickname, setNickname] = useState(localStorage.getItem('nickname'));
    const [newNickname, setNewNickname] = useState("");

    function onChange(e){
        setNewNickname(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        localStorage.setItem('nickname', newNickname);
        setUsername(newNickname);
        setNickname(newNickname);
        // 🔥바뀐 닉네임값이랑 유저고유번호랑 함께 다시 백으로 전송해야함?? 바뀐이름으로 ? ISSUE#14
        setNewNickname("");
    }
    const navigate = useNavigate();
    const onLogOutClick = () =>{
        authService.signOut();
        navigate("/");
    }
    return(
        <>
            <h2>안녕하세요.</h2>
            <h1>{nickname} 님</h1>
            <p>오늘도 나의 농장에서 힐링하세요🌾</p>
            {/* <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" value={newNickname} placeholder="You can change your nickname" />
            </form> */}
            <div style={{display: 'flex'}}>
                <button className='login-btn' onClick={onLogOutClick} ><Link to ="/" style={{color: 'white', textDecoration: 'none'}}>Log Out</Link></button>
            </div>
        </>
    )
}
export default Profile;