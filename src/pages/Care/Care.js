import React, {useState, useEffect} from 'react';
import Disease from "./Disease";
import Crop from "./Crop";
import Recipe from './Recipe';

const Care =()=>{


    return(
        <>
            THIS IS CARE
            <h1>작물로 치유하기</h1>
            <Disease/>
            <Recipe />
        </>
    )
}
export default Care;