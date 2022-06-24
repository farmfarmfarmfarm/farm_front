import React, { useEffect, useState } from "react";
import {useRecoilState} from 'recoil';
import {selectedFarm} from '../../Atom';

const Check = ({checkedItems, setcheckedItems}) => {
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm);

  const formData = [
    {id: 1, name: "주말농장"},
    {id: 2, name: "치유농장"},
    {id: 3, name: "체험농장"},
  ];
  const onRemove = id => {
    setcheckedItems(checkedItems.filter(each => each !== id));
  };
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode.lastChild, target.value, target.checked);
  };

  const checkedItemHandler = (text, category, isChecked) => {
    if(isChecked) {
      setcheckedItems([...checkedItems, category]);
      text.style.color = 'gray';
    } else if (!isChecked ) {
      onRemove(category);
      text.style.color = '#aeaeae';
    }
    return checkedItems;
  };
  useEffect(() => {
    setRcfarm(checkedItems);
  },[checkedItems]);

  return (
    <div className="contStyle">
      {formData.map((item) => (
        <div className="StFarmDiv" key={item.id} >
          <label className="innerBox" style={{cursor: 'pointer'}}>
            <input className="StFarmInput"
              type = "checkbox"
              value={item.name}
              onChange={(e) => checkHandler(e)}
            />
            <span style={{fontSize: '16px'}}>{item.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Check;