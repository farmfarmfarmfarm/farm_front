import React, {useState, useEffect} from 'react';
import Check from "pages/Home/Check";
import { Navermap } from './Navermap';

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
    console.log(place, center);
    

    useEffect(() => {
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(place, placesSearchCB)
        function placesSearchCB(data, status, pagination) {
            setCenter((prev) => ({
                ...prev,
                x: data[0].x,
                y: data[0].y
            })); // 첫번째 검색결과의 좌표를 center좌표로 한다.
        }
    }, [place]);
    
    
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
        </div>
        
    );
}

export default Main;
