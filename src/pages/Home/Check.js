import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedFarm } from "../../Atom";

const Check = () => {
  const [rcfarm, setRcfarm] = useRecoilState(selectedFarm);
  const formData = [
    { id: 1, name: "주말농장" },
    { id: 2, name: "치유농장" },
    { id: 3, name: "체험농장" },
  ];

  const checkHandler = ({ target }) => {
    setRcfarm(target.value);
  };

  return (
    <div className="contStyle">
      {formData.map((item) => (
        <div className="StFarmDiv" key={item.id}>
          <input
            className="StFarmInput"
            type="radio"
            value={item.name}
            id={item.id}
            name="farm"
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
