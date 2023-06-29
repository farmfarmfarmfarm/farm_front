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
      const response = await axios.get(process.env.REACT_APP_DB_HOST+`/api/crops`);
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

  return (
    <div>
      <h2 style={{ marginBottom: "0" }}>모든 작물 보기</h2>
      <span style={{ fontSize: "10px" }}>
        {" "}
        작물을 누르면 작물 정보와 활용 레시피를 볼 수 있어요
      </span>
      <div className="allcropswrap">
        {formData.map((item) => (
          // <div className="allcropsbtn" key={item.id}>
          <button
            className="allcropsname"
            key={item.id}
            type="checkbox"
            value={item.id}
            id={item.id}
            style={{ fontSize: "16px" }}
            onClick={() => navigate(`/crop/recipe/${item.id}`)}
          >
            {item.name}
          </button>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default AllCrops;
