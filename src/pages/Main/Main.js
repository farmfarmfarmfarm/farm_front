import React, {useState} from 'react';
import Check from "pages/Home/Check";
import { Navermap } from './Navermap';

function Main() {
    const [checkedItems, setcheckedItems] = useState([]);
    console.log( checkedItems);
    return (
        <div>
            <input type="text" placeholder='어느 지역을 찾으시나요?' />
            <div>어떤 농장을 가볼까요?</div>
            <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
            <Navermap />
        </div>
        
    );
}

export default Main;