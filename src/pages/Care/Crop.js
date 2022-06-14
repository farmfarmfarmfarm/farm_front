import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {StFarmChooseContainer, StFarmDiv, StFarmInput} from 'pages/Home/CheckStyle';
import {selectedDiease} from '../../Atom';
import {useRecoilState} from 'recoil';

const Crop = ({checkedItems, setcheckedItems}) => {

    const [crops,setCrops] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);
    const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);

    // for (let i=0;i<10;i++){
    //     axios.get('/api/farm/EXP').then(
    //       (res) => {
    //         setResAddress((prev)=>[...prev,{
    //           id: 1,
    //           category: 'EXP',
    //           name: '머머농장',
    //           address: res.data.data[i].address
    //         }]);
    //       },
    //     )
    //     .catch()
    //   }
    //   console.log(resAddress);

    console.log(typeof(Number(rcdiease[0])));

    const fetchCrops = async () => {
        try {
            setCrops(null);
            setError(null);
            setLoading(true); //로딩이 시작됨
            const response = await axios.get('/api/crop/'+2);
            setCrops(response.data.data);

        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };



    useEffect( () =>{
        
        fetchCrops();
    },[] )


    if ( loading ) return <div>로딩중..</div>
    if (error) return <div>에러 발생!!</div>
    if (!crops) return null; 

    const formData = crops;

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

    return (
    <StFarmChooseContainer className="contStyle">
      {formData.map((item) => (
        <StFarmDiv key={item.id} >
          <label className="innerBox">
            <StFarmInput
              type = "checkbox"
              value={item.name}
              onChange={(e) => checkHandler(e)}
            />
            <span>{item.name}</span>
          </label>
        </StFarmDiv>
      ))}
    </StFarmChooseContainer>

    );
    
}


export default Crop;