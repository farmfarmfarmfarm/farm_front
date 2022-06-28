import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectedDiease, selectedCrop} from '../../Atom';
import { Link } from 'react-router-dom';
import './Care.css';

const AllCrops = () => {

    const [checkedItem, setcheckedItem] = useState('');
    const [allcrops,setallCrops] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);
    const [rccrop, setRccrop] = useRecoilState(selectedCrop);

    const fetchAllCrops = async () => { 
        try {
            setallCrops(null);
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get('api/crop/findall');
            setallCrops(response.data.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect( () =>{
      fetchAllCrops();
    },[] )

    function goRecipe(e) {
      console.log(e);
    }
    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!allcrops) return null; 

    const formData =allcrops;

    return (
    <div>
      <h2>모든 작물 보기</h2>
        <div className="container">
          {formData.map((item) => (
              <div className="item" key={item.id} >
                <button className="StDiseInput" onClick={() => goRecipe} type = "checkbox" value={item.id} id={item.id}>
                  <p style={{fontSize: '13px'}}>{item.name}</p>
                </button>             
              </div>
          ))}
        </div>
    </div>
    );
    
}


export default AllCrops;