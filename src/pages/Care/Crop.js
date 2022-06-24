import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {selectedDiease, selectedCrop} from '../../Atom';
import {useRecoilState} from 'recoil';

const Crop = () => {

    const [checkedItems, setcheckedItems] = useState([]);
    const [crops,setCrops] = useState(null);   //결과값
    const [nocrops,setNoCrops] = useState(null);   //결과값
    const [loading,setLoading] = useState(false); // 로딩되는지 여부
    const [error,setError] = useState(null); //에러    
    const [isChecked, setIsChecked] = useState(false);
    const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);
    const [rccrop, setRccrop] = useRecoilState(selectedCrop);

    const dieaselist = rcdiease;   
    console.log(dieaselist)
    const requests = dieaselist&&dieaselist.map(num => fetch(`http://52.78.15.203:8080/api/crop/${num}`));

    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      // .then(users => users.forEach(user => console.log(user.data)))
      .then(result => result.map(crop => croplist(crop)))
      .catch(error => console.log(error))

    function croplist (data) {
      console.log(data.data)
    }

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
          text.style.color = 'black';
        } else if (!isChecked ) {
          onRemove(id);
          text.style.color = '#aeaeae';
        }
        return checkedItems;
    };

    return (
    <div>
      <h3>효능 작물</h3>

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
    </div>
    );
    
}


export default Crop;