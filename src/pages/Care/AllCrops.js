import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectedDiease, selectedCrop} from '../../Atom';
import { useNavigate } from 'react-router-dom';
import './Care.css';

const AllCrops = () => {
    const navigate = useNavigate();
    const [checkedItem, setcheckedItem] = useState('');
    const [allcrops,setallCrops] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);

    const fetchAllCrops = async () => { 
        try {
            setallCrops(null);
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get(process.env.REACT_APP_DB_HOST+'/api/crop/findall');
            setallCrops(response.data.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect( () =>{
      fetchAllCrops();
    },[] )

    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!allcrops) return null; 

    const formData =allcrops;

    return (
    <div>
      <h2 style={{marginBottom:'0'}}>모든 작물 보기</h2>
        <span style={{fontSize:'10px'}}> 작물을 누르면 정보를 알 수 있어요</span>
        <div className="allcropswrap">
          {formData.map((item) => (
              <div className="allcropsbtn" key={item.id} >
                <button className="allcropsname" type = "checkbox" value={item.id} id={item.id} style={{fontSize: '16px'}}>
                  {item.name}
                </button> 
                  <p className='arrow_box'>
                    <div>-{item.name} 정보-</div>
                    <div>● 제철시기:<b>{item.season}</b></div>
                    <div>● 보관 온도: <b>{item.temperature}</b></div>
                    <div>● 보관 방법: <b>{item.storage}</b></div>
                  </p>
                <button className='gotoRe' onClick={() => navigate(`/crop/recipe/${item.id}`)}>-레시피보러가기-</button>           
              </div>
          ))}
        </div>
    </div>
    );
    
}


export default AllCrops;