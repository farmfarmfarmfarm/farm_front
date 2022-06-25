import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectedDiease, selectedCrop} from '../../Atom';
import { Link } from 'react-router-dom';
import './Care.css';



const AllCrops = () => {

    const [checkedItems, setcheckedItems] = useState([]);
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

    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!allcrops) return null; 

    const formData =allcrops;

    const onRemove = id => {
      setcheckedItems(checkedItems.filter(each => each !== id));
    };
    const checkHandler = ({ target }) => {
      setIsChecked(!isChecked);
      checkedItemHandler(target.parentNode.lastChild, target.value, target.checked);
    };
  
    const checkedItemHandler = (text, id, isChecked) => {
      if(isChecked) {
        setcheckedItems([...checkedItems, id]);
      } else if (!isChecked ) {
        onRemove(id);
      }
      return checkedItems;
    };


    return (
    <div>
      <h2>모든 작물 보기</h2>
        <div className="container">
          {formData.map((item) => (
            <div className="item" key={item.id} >             
                <input className="StDiseInput" type = "checkbox" value={item.id} id={item.id} onChange={(e) => checkHandler(e)}/>
                <label className="innerbox" for={item.id} style={{cursor: 'pointer'}}>
                <p style={{fontSize: '13px'}}>{item.name}</p>
              </label> 
            </div>
          ))}
        </div>
    </div>
    );
    
}


export default AllCrops;