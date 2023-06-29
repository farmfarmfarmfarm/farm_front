import React, { useState, useEffect } from "react";
import axios from "axios";
import { selectedDiease, selectedCrop } from "../../Atom";
import { useRecoilState } from "recoil";
import AllCrops from "./AllCrops";
import "./Care.css";
import { useNavigate } from "react-router-dom";

const Crop = () => {
  const [formData, setFormData] = useState([]);
  const [rcdiease, setRcdiease] = useRecoilState(selectedDiease);
  const [Result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const uniqueResults = [];

      for (let i = 0; i < rcdiease.length; i++) {
        const effectId = parseInt(rcdiease[i]);
        const res = await axios.get(
          `api/effects/${effectId}/crops?include_effects=true`
        );

        res.data.forEach((e) => {
          const existingCrop = uniqueResults.find((crop) => crop.name === e.name);
          if (!existingCrop) {
            uniqueResults.push({
              effectList: e.effects,
              name: e.name,
            });
          }
        });
      }
      setResult(uniqueResults);
    };

    if (rcdiease.length > 0) {
      fetchData().catch((err) => {
        console.log(err);
      });
    } else {
      setResult([]); // 증상이 선택되지 않은 경우 결과를 빈 배열로 설정
    }
  }, [rcdiease]);

  return (
    <div className="cropwrap">
      <h2 style={{ marginBottom: 0 }}>효능 작물</h2>
      {Result.map((item, i) => (
        <div className="cropbtn" key={i}>
          <div className="EffectCrop">
            <button
              className="StCropInput"
            >
              {item.name}
            </button>
            <div className="effectList">
              {item.effectList.map((e, i) => (
                <div key={i}>{e}</div>
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
