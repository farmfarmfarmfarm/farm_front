import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Care.css";

const AllCrops = () => {
  const navigate = useNavigate();
  const [checkedItem, setcheckedItem] = useState("");
  const [allcrops, setallCrops] = useState(null); //결과값
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러

  const fetchAllCrops = async () => {
    try {
      setallCrops(null);
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get("/api/crops");
      setallCrops(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllCrops();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생!!</div>;
  if (!allcrops) return null;

  const formData = allcrops;
  console.log(formData);
  return (
    <div style={{ padding: "0px 10px" }}>
      <h2>모든 작물 보기</h2>
      <p style={{ fontSize: "14px", color: "#7c7c7c" }}>
        {" "}
        작물을 누르면 작물 정보와 활용 레시피를 볼 수 있어요
      </p>
      <div className="allcropswrap">
        {formData.map((item) => (
          // <div className="allcropsbtn" key={item.id}>
          <div
            className="allcropsname"
            key={item.id}
            type="checkbox"
            value={item.id}
            id={item.id}
            style={{ fontSize: "16px" }}
            onClick={() => navigate(`/crop/recipe/${item.id}`)}
          >
            <img src={item.img} style={{ width: "40px" }} />
            <div>{item.name}</div>
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default AllCrops;
