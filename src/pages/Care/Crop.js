import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {selectedDiease, selectedCrop} from '../../Atom';
import {useRecoilState} from 'recoil';
import AllCrops from './AllCrops';
import './Care.css';

const Crop = () => {

    const [checkedItems, setcheckedItems] = useState([]);
    const [formData, setformData] = useState([]);
    const [crops,setCrops] = useState(null);   //결과값
    const [nocrops,setNoCrops] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);
    const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);
    const [rccrop, setRccrop] = useRecoilState(selectedCrop);

    const dieaselist = rcdiease;   
    const requests = dieaselist&&dieaselist.map(num => fetch(`/api/crop/${num}`));
    console.log(rcdiease.includes(''));

    useEffect( () => {
      Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(users => users.forEach(user => {
        setformData([...formData, user.data]);
        console.log(user.data);
      }))
      .catch(error => console.log(error))
    }, [])

    
    useEffect(() => {
      setRccrop(checkedItems);
    },[checkedItems]);


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
      <h2>효능 작물</h2>
      <div>
        {formData&&formData.map((i) => (
          <p>{i.name}</p>
        ))}
      </div>
      {/* <StFarmChooseContainer className="contStyle">
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
      </StFarmChooseContainer> */}
      <AllCrops></AllCrops>
    </div>
    );
    
}


export default Crop;