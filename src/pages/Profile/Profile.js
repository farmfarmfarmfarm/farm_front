import React, {useState} from "react";
import { useRef } from "react";

//props로 username을 받아와 보았으나, 새로고침하면 날라사는 이슈!!
const Profile =({username,setUsername})=>{

    const [nickname, setNickname] = useState(localStorage.getItem('nickname'));

    function onChange(e){
        setNickname(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        localStorage.setItem('nickname', nickname);
        setUsername(localStorage.getItem('nickname'))
        // 🔥바뀐 닉네임값이랑 유저고유번호랑 함께 다시 백으로 전송해야함
        setNickname("");
    }
    return(
        <>
            THIS IS Profile
            <div>로그인한거 확인 완료-! </div>
            <h2>안녕하세요  " {nickname} "</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="You can change your nickname" />
            </form>
        </>
    )
}
export default Profile;