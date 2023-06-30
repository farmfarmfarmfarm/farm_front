import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Care.css";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Recipe = () => {
  const params = useParams();
  const [crop, setCrop] = useState(null);
  const [recipe, setRecipe] = useState(null); //결과값
  const [loading, setLoading] = useState(false); // 로딩되는지 여부
  const [error, setError] = useState(null); //에러
  const [cropinfo, setCropinfo] = useState([]);

  const fetchCropInfo = async (cropId) => {
    try {
      setCrop(null);
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`/api/crops/${cropId}/effects`);
      setCrop(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCropInfo(params.cropId);
  }, []);

  const fetchDisease = async (cropId) => {
    try {
      setRecipe(null);
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.get(`/api/crops/${cropId}/recipes`);
      setRecipe(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };
  async function getCropInfo(farmID) {
    await axios
      .get(`/api/crops/${farmID}`)
      .then((res) => {
        setCropinfo(res.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }
  useEffect(() => {
    fetchDisease(params.cropId);
    getCropInfo(params.cropId);
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러 발생!!</div>;
  if (!recipe) return null;
  if (!crop) return null;

  const formData = recipe;
  // console.log(formData);

  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 1, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
  };

  return (
    <div style={{ padding: "0px 10px" }}>
      <div className="titlewrap">
        {cropinfo && (
          <>
            <div className="recipetitle">{cropinfo.name}</div>
            <div className="recipecropinfo">
              <div>
                <div style={{ color: "#383e38" }}>제철</div>
                <div>{cropinfo.season}</div>
              </div>
              <div>
                <div style={{ color: "#383e38" }}>보관 방법</div>
                <div>{cropinfo.storage}</div>
              </div>
              <div>
                <div style={{ color: "#383e38" }}>보관 온도</div>
                <div>{cropinfo.temperature}</div>
              </div>
            </div>
          </>
        )}
      </div>

      <Slider {...settings}>
        {formData.map((item, i) => (
          <div className="recipeitem" key={item.id}>
            <div className="recipeName">
              <div className="recipeId">-{item.id}번째 레시피-</div>
              <div>{item.name}</div>
            </div>
            <div className="recipeIngre">
              <h3>- 준비재료 -</h3>
              <div>{item.ingredient}</div>
            </div>
            <div className="stepWrap">
              {item.recipeSteps.map((step) => (
                <div className="step" key={step.id}>
                  <div className="stepIdx">
                    Step {step.stepIdx.toString().padStart(2, "0")}
                  </div>
                  <div className="stepCooking">{step.cooking}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Recipe;
