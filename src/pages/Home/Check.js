import React, { useState } from "react";
import {StFarmChooseContainer, StFarmDiv, StFarmInput} from './CheckStyle';

const Check = ({checkedItems, setcheckedItems}) => {
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
};

export default Check;