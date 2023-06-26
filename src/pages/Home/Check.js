import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedFarm } from "../../Atom";

const Check = ({ checkedItems, setcheckedItems }) => {
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm);
  const formData = [
    { id: 1, name: "주말농장" },
    { id: 2, name: "치유농장" },
    { id: 3, name: "체험농장" },
  ];
  const onRemove = (id) => {
    setcheckedItems(checkedItems.filter((each) => each !== id));
  };
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = ({ target }) => {
    // console.log(target);
    setRcfarm(target.value);
    setIsChecked(!isChecked);
    checkedItemHandler(
      target.parentNode.lastChild,
      target.value,
      target.checked
    );
  };

  const checkedItemHandler = (text, category, isChecked) => {
    if (isChecked) {
      setcheckedItems([...checkedItems, category]);
    } else if (!isChecked) {
      onRemove(category);
    }
    return checkedItems;
  };

  return (
    <div className="contStyle">
      {formData.map((item) => (
        <div className="StFarmDiv" key={item.id}>
          <input
            className="StFarmInput"
            type="checkbox"
            value={item.name}
            id={item.id}
            onChange={(e) => checkHandler(e)}
          />
          <label
            className="innerBox"
            htmlFor={item.id}
            style={{ cursor: "pointer" }}
          >
            <span style={{ fontSize: "12px" }}>{item.name}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Check;
