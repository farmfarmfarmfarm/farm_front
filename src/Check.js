import React, { useState } from "react";
import './App.css';

const Check = () => {
  const formData = [
    {id: 1, name: "주말농장"},
    {id: 2, name: "치유농장"},
    {id: 3, name: "체험농장"},
  ];

  const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setcheckedItems] = useState(new Set());

  const checkHandler = ({ target }) => {
    setIsChecked(!isChecked);
    checkedItemHandler(target.parentNode, target.value, target.checked);
  };

  const checkedItemHandler = (box, id, isChecked) => {
    if(isChecked) {
      checkedItems.add(id);
      setcheckedItems(checkedItems);
      box.style.backgroundColor = "#F6CB44";
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setcheckedItems(checkedItems);
      box.style.backgroundColor = "#fff";
    }
    return checkedItems;
  };

  return (
    <div className="contStyle">
      {formData.map((item) => (
        <label key={item.id} className="innerBox">
          <input
            type = "checkbox"
            value={item.name}
            onChange={(e) => checkHandler(e)}
          />
          <div>{item.name}</div>
        </label>
      ))}
    </div>
  );
};

export default Check;