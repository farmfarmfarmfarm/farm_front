import React, { useEffect, useState } from 'react';
import Check from "pages/Home/Check";
import TextInput from 'pages/Home/TextInput';

function Main() {
    return (
        <div>
            <div>찾는 농장을 선택해주세요</div>
            <Check></Check>
        </div>
        
    );
}

export default Main;