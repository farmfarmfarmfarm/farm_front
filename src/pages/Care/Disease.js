import React, { useState } from "react";
// import './App.css';

const Disease = () => {
  const formData = [
    {id: 1, name: "시력 저하"},
    {id: 2, name: "장 운동 저하"},
    {id: 3, name: "스트레스성 위염"},
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
      <h3>진단하기</h3>
      {formData.map((item) => (
        <div key={item.id}>
          <label className="innerBox">
            <input
              type = "checkbox"
              value={item.name}
              onChange={(e) => checkHandler(e)}
            />
            <span>{item.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Disease;