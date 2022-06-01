import React, { useState } from "react";
// import './App.css';

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
      // box.style.backgroundColor = "#F6CB44";
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setcheckedItems(checkedItems);
      // box.style.backgroundColor = "#fff";
    }
    return checkedItems;
  };
  const farmContainStyle = {
    display: 'flex',
    justifyCcontent: 'space-around',
    padding: '10px 0 18px',
    textAlign: 'center',
    color: '#aeaeae',
    fontSize: '26px',
  }

  return (
    <div className="contStyle" style={farmContainStyle}>
      {formData.map((item) => (
        <div key={item.id} >
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

export default Check;