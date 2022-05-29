import React, {useState} from "react";
import { authService } from "pages/Login/fbase";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";

const Profile =({username,setUsername})=>{

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
            <p>THIS IS Profile</p>
            <div>로그인한거 확인 완료-! </div>
            <h2>안녕하세요  {nickname} 님</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" value={newNickname} placeholder="You can change your nickname" />
            </form>
            <button onClick={onLogOutClick}><Link to ="/">Log Out</Link></button>
            
        </>
    )
}
export default Profile;