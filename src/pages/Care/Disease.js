import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {StFarmChooseContainer, StFarmDiv, StFarmInput} from 'pages/Home/CheckStyle';
import {useRecoilState} from 'recoil';
import {selectedDiease} from '../../Atom';


const Disease = ({checkedItems, setcheckedItems}) => {

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
            const response = await axios.get('/api/effect/findall');
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
        text.style.color = 'black';
      } else if (!isChecked ) {
        onRemove(id);
        text.style.color = '#aeaeae';
      }
      return checkedItems;
    };

    console.log(checkedItems)

    return (
    <div>
      <h3>자신의 증상에 가까운 것들을 체크해 주세요</h3>
        <StFarmChooseContainer className="contStyle">
          {formData.map((item) => (
            <StFarmDiv key={item.id} >
              <label className="innerBox">
                <StFarmInput
                  type = "checkbox"
                  value={item.id}
                  onChange={(e) => checkHandler(e)}
                />
                <span>{item.effect}</span>
              </label>
            </StFarmDiv>
          ))}
        </StFarmChooseContainer>
    </div>
    );
    
}


export default Disease;