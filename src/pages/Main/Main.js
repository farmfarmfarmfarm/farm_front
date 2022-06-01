import React from 'react';
import Check from "pages/Home/Check";

function Main() {
    return (
        <div>
            <input type="text" placeholder='어느 지역을 찾으시나요?' />
            <div>어떤 농장을 가볼까요?</div>
            <Check></Check>
        </div>
        
    );
}

export default Main;