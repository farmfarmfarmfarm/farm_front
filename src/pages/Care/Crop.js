import React, { useState, useEffect } from "react";
import axios from "axios";
import { selectedDiease, selectedCrop } from "../../Atom";
import { useRecoilState } from "recoil";
import AllCrops from "./AllCrops";
import "./Care.css";
import { useNavigate } from "react-router-dom";

const Crop = () => {
  const [formData, setformData] = useState([]);
  const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);
  const [Result, setResult] = useState([]);
  const navigate = useNavigate();

  const dieaselist = rcdiease;
  // console.log(rcdiease); //['1','2'] //증상번호

  useEffect(() => {
    for (let i = 0; i < rcdiease.length; i++) {
      getData(parseInt(rcdiease[i]));
    }
  }, [rcdiease]);
  async function getData(cate) {
    await axios
      .get(`api/effects/${cate}/crops`)
      .then(
        //증상(효능)번호로 해당되는 작물찾기
        (res) => {
          res.data.data.forEach((e) => {
            setResult((prev) => [
              ...prev,
              {
                id: e.cropId, //작물번호
                effectList: e.effects,
                name: e.name,
                season: e.season,
                temperature: e.temperature,
                storage: e.storage,
                ingredient: e.ingredient,
              },
            ]);
          });
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="cropwrap">
      <h2>효능 작물</h2>
      {Result.map((item, i) => (
        <div className="cropbtn" key={i}>
          <div className="EffectCrop">
            <button
              className="StCropInput"
              type="checkbox"
              value={item.id}
              id={item.id}
            >
              {item.name}
            </button>
            <div className="effectList">
              {item.effectList.map((e, i) => (
                <span>{e} </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <AllCrops />
    </div>
  );
};

export default Crop;
