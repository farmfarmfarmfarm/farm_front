import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {selectedDiease, selectedCrop} from '../../Atom';
import {useRecoilState} from 'recoil';
import AllCrops from './AllCrops';
import './Care.css';
import { useNavigate } from 'react-router-dom';

const Crop = () => {
    const [formData, setformData] = useState([]);
    const [crops,setCrops] = useState(null);   //결과값
    const [nocrops,setNoCrops] = useState(null);   //결과값
    const [Done,setDone] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);
    const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);
    const [rccrop, setRccrop] = useRecoilState(selectedCrop);
    const [Result, setResult] = useState([]);
    const [Effect, setEffect] = useState([]);
    const navigate = useNavigate();

    const dieaselist = rcdiease;   
    const requests = dieaselist&&dieaselist.map(num => fetch(REACT_APP_DB_HOST+`/api/crop/${num}`)); 
    // console.log(rcdiease); //['1','2'] //증상번호

    useEffect( () => {
      for(let i=1; i<=75; i++) {
        axios.get(REACT_APP_DB_HOST+`/api/effect/${i}`).then( //작물번호로 그작물의 효능(증상)찾기
          (res) => {
            res.data.data.forEach((e) =>{
              // console.log(e.effect);
              setEffect((prev)=>[...prev,{
                id: e.id,
                effect: e.effect,
              }]);
            });
          }
        )
        .catch((err)=>{
          console.log(err);
        })
      }
      for (let i=0; i<rcdiease.length; i++){
        getData(parseInt(rcdiease[i]));

      }
    }, [])
    async function getEffect(cropId) {

    }
    async function getData(cate) {
      await axios.get(REACT_APP_DB_HOST+`/api/crop/${cate}`).then( //증상(효능)번호로 해당되는 작물찾기
        (res) => {
          // console.log(res.data.data);
          res.data.data.forEach((e) =>{
            setResult((prev)=>[...prev,{
              id: e.id, //작물번호
              name: e.name,
              season: e.season,
              temperature: e.temperature,
              storage: e.storage,
              ingredient: e.ingredient
            }]);
          });
        }
      )
      .catch((err)=>{
        console.log(err);
      })
    }



    const resultpring = (i) => {
      for(let j=1;j<75;i++){
        if (i===j){
          console.log(Effect[i].id);
        }
      }
      return ;
    }
    function goRecipe(e) {
      console.log(e.target.id);
      navigate(`recipe/${e.target.id}`)
    }
    return (
      <div>
        <h2>효능 작물</h2>
        <div>
          {formData&&formData.map((i) => (
            <p>{i.name}</p>
          ))}
        </div>
          {Result.map((item, i) => (
            <div className='cropbtn' key={i}>
              <button className="StDiseInput" onClick={goRecipe} type = "checkbox" value={item.id} id={item.id}>
                {item.name}
              </button>
              <p className='arrow_box'>
                <div>제철시기:{item.season}</div>
                <div>보관 온도: {item.temperature}</div>
                <div>보관 방법: {item.storage}</div>
              </p>
            </div>
          ))}
        
          <AllCrops />
      </div>
    );
    
}


export default Crop;