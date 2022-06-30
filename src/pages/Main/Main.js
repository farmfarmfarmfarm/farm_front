import React, {useState, useEffect} from 'react';
import Check from "pages/Home/Check";
import { Link } from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectedLoc, selectedFarm, selectedPlace} from '../../Atom';
import axios from 'axios';
import './styleMain.css';
import { useNavigate } from "react-router-dom";
import search from 'assets/icons/search.png'

function Main() {
    const { kakao } = window;
    const [rcloc, setRcloc] = useRecoilState(selectedLoc);
    const [place, setPlace] = useRecoilState(selectedPlace);

    const [checkedItems, setcheckedItems] = useState('');
    const [inputText, setInputText] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(inputText)
        setInputText('')
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_DB_HOST+'/api/farm/findall').then(
            (res) => {
                // console.log(res.data.data.length, '개의 농장 찾기 성공');
            }
        )
        .catch()
        
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(place, placesSearchCB)
        function placesSearchCB(data, status, pagination) {
            console.log("설정위치", data[0]);
            if (data.length===0){
                setPlace("");
                alert('해당하는 위치를 찾을 수 없습니다');
            } else {
                setRcloc((prev) => ({
                    ...prev,
                    x: data[0].x,
                    y: data[0].y,
                })); // 첫번째 검색결과의 좌표를 center좌표로 한다.
            }
        }

    }, [place]);
    let navigate = useNavigate();
    useEffect(() => {
        if (place !== '' & checkedItems[0]!== undefined){
            navigate("/home");
        }    
    }, [checkedItems])
    
    return (
        <div>
            {/* <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check> */}
            <div className='warp'>
                <h3 className='farmQ'>주변 농장 검색할 위치를 알려주세요!</h3>
                <form className="inputForm" onSubmit={handleSubmit} style={{display:'flex', justifyContent: 'space-around'}}>
                    <input placeholder={place==="" ? "어디로 갈까요?" : place } onChange={onChange} value={inputText} />
                    {(place !== '' ) ? 
                        <Link to='/home'><img style={{width: '27px', height:'40px'}} src={search} alt="검색"></img></Link> 
                        : <img style={{width: '27px', height:'27px'}} src={search} alt="검색"></img>}
                    </form>
                
            </div>
        </div>
        
    );
}

export default Main;