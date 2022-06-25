import React, {useState} from 'react';
import Check from "pages/Home/Check";
import MapNList from "components/kakaoMap/MapNList";
import {useRecoilState} from 'recoil';
import {selectedLoc, selectedFarm, selectedPlace} from '../../Atom';

const Home =()=>{
    const [place, setPlace] = useRecoilState(selectedPlace);
    const [checkedItems, setcheckedItems] = useState(['주말농장']);
    console.log('중심위치',place);

    return(
        <>
            <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
            <MapNList />
        </>
    )
}
export default Home;