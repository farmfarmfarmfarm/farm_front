import React, { useEffect, useState } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import Check from "pages/Home/Check";
import TextInput from 'pages/Home/TextInput';

function Main() {
    return (
        <div>
            <RecoilRoot>
                <TextInput></TextInput>
            </RecoilRoot>
            <div>찾는 농장을 선택해주세요</div>
            <Check></Check>
        </div>
        
    );
}

export default Main;