import React, {useState, useEffect} from 'react';
import Check from "pages/Home/Check";
import { Navermap } from './Navermap';
import { Link } from 'react-router-dom';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import {selectedLoc, selectedFarm} from '../../Atom';

function Main() {
    const { kakao } = window;
    const [rcloc, setRcloc] = useRecoilState(selectedLoc);

    const [checkedItems, setcheckedItems] = useState([]);
    const [inputText, setInputText] = useState('')
    const [place, setPlace] = useState('')

    const onChange = (event) => {
        setRcloc(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(inputText)
        setInputText('')
    }

    useEffect(() => {
        const ps = new kakao.maps.services.Places()

        ps.keywordSearch(place, placesSearchCB)
        function placesSearchCB(data, status, pagination) {
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

    return (
        <div>
            <form className="inputForm" onSubmit={handleSubmit}>
                <RecoilRoot>
                    <input type="text" value={rcloc} onChange={onChange} placeholder='어느 지역을 찾으시나요?'  />
                </RecoilRoot>
                <button type="submit">검색</button>
                <p>{rcloc}</p>
            </form>
            {/* <p>{place}</p> */}
            <div>어떤 농장을 가볼까요?</div>
            <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
            {/* <Navermap /> */}
            {(place !== '' & checkedItems[0]!==undefined) ? <Link to='/home'>농장찾으러가기</Link> : null}
        </div>
        
    );
}

export default Main;