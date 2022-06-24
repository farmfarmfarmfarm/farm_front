import React, {useState} from 'react';
import Check from "pages/Home/Check";
import MapNList from "components/kakaoMap/MapNList";
import {useRecoilState} from 'recoil';
import {selectedLoc, selectedFarm, selectedPlace} from '../../Atom';

const Home =()=>{
    const [place, setPlace] = useRecoilState(selectedPlace);
    const [checkedItems, setcheckedItems] = useState([]);

    return(
        <>
            THIS IS HOME_이거나중엔 nav에서 없애야됨. Main에서 위치, 농장 선택 후에 접근 가능
            <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
            <h3>{place}</h3>
            <MapNList />
        </>
    )
}
export default Home;