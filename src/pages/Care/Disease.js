import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectedDiease} from '../../Atom';
import { Link } from 'react-router-dom';
import './Care.css';



const Disease = () => {

    const [checkedItems, setcheckedItems] = useState([]);
    const [diseases,setDiseases] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);
    const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);


    const fetchDisease = async () => { 
        try {
            setDiseases(null);
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get('api/effect/findall');
            setDiseases(response.data.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };



    useEffect( () =>{
        
        fetchDisease();
    },[] )

    useEffect(() => {
      setRcdiease(checkedItems);
    },[checkedItems]);



    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!diseases) return null; 

    const formData = diseases;

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

    // const handleNow = ()=>{
    //   setIsNow(true);
    // }

    return (
    <div>
      <p className='select'>증상을 선택하세요</p>
      <p className='check'>자신의 증상에 가까운 것들을 체크해 주세요</p>
        <div className="checkStyle">
          {formData.map((item) => (
            <div className="StDiseDiv" key={item.id} >
              <input className="StDiseInput"
                type = "checkbox"
                value={item.id}
                onChange={(e) => checkHandler(e)}
              />
              <label className="innerbox" style={{cursor: 'pointer'}}></label>
              <span>{item.symptom}</span>
            </div>
          ))}
        </div>
        {/* <button onClick={()=> handleNow()}> 작물로 진단받기 </button>
        {isNow ? <Crop></Crop> : null}  */}
        {(rcdiease !== '' & checkedItems[0]!==undefined) ? <button><Link to='/crop'>결과보기</Link></button> : <button>결과보기</button>}
    </div>
    );
    
}


export default Disease;