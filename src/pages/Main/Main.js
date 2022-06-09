import React, {useState, useEffect} from 'react';
import Check from "pages/Home/Check";
import { Navermap } from './Navermap';
import { Link } from 'react-router-dom';

function Main() {
    const { kakao } = window;

    const [checkedItems, setcheckedItems] = useState([]);
    const [inputText, setInputText] = useState('')
    const [place, setPlace] = useState('')
    const [center, setCenter] = useState({x: 0, y:0});

    const onChange = (e) => {
        setInputText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(inputText)
        setInputText('')
    }

    console.log( '선택한 농장 : ',checkedItems);
    console.log('검색위치',place, '중심좌표',center);
    

    useEffect(() => {
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(place, placesSearchCB)
        function placesSearchCB(data, status, pagination) {
            if (data.length===0){
                setPlace("");
                alert('해당하는 위치를 찾을 수 없습니다');
            } else {
                setCenter((prev) => ({
                    ...prev,
                    x: data[0].x,
                    y: data[0].y
                })); // 첫번째 검색결과의 좌표를 center좌표로 한다.
            }
        }
    }, [place]);
    
    let url;
    useEffect(() => {
        if (place !== '' & checkedItems[0]!==undefined){
            console.log(place, checkedItems[0],"선택완");
            url = '/home/'+place;
        }
    }, [place, checkedItems])
    return (
        <div>
            <form className="inputForm" onSubmit={handleSubmit}>
                <input placeholder="가고싶은 지역을 선택하세요" onChange={onChange} value={inputText} />
                <button type="submit">검색</button>
            </form>
            <p>{place}</p>
            <div>어떤 농장을 가볼까요?</div>
            <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
            {/* <Navermap /> */}
            <Link to='/home/1'>농장찾으러가기</Link>
        </div>
        
    );
}

export default Main;