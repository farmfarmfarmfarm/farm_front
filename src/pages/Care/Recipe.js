import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectedCrop} from '../../Atom';
import { Link } from 'react-router-dom';
import './Care.css';
import { useParams } from "react-router-dom";

const Recipe =()=>{
    const params = useParams();
    console.log(params);
    const [rccrop, setRccrop] = useRecoilState(selectedCrop);
    const [recipe,setRecipe] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러   
    const [checkedItems, setcheckedItems] = useState([]);  
    const [isChecked, setIsChecked] = useState(false);
    
    const num = rccrop;
    
    const fetchDisease = async (cropId) => { 
        try {
            setRecipe(null);
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get(`/api/recipe/${cropId}`);
            setRecipe(response.data.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect( () =>{
        fetchDisease(params.cropId);
    },[] )

    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!recipe) return null; 

    const formData = recipe;
    console.log(formData);

    return(
        <div>
            레시피
            {formData.map((item) => (
                <div className="item" key={item.id} >     
                    <h2>{item.id}</h2>        
                    <div>{item.name}</div>
                    <h3>재료</h3>
                    <div>{item.ingredient}</div>
                    <h3>레시피 보기</h3>
                    <div>{item.recipeSteps.map((step) => (
                        <div className="step" key={step.id} >
                            <div>{step.stepIdx}</div>
                            <div>{step.cooking}</div>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default Recipe;