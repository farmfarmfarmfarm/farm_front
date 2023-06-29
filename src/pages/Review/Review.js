import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ratingAvg, thisloc } from "../../Atom";
import Chart from "pages/Review/Chart";
import quotes from "assets/icons/quotes.png";
import triangle from "assets/icons/triangle.png";
import pin from "assets/icons/pin.png";
import link from "assets/icons/link.png";
import call from "assets/icons/call.png";
import info from "assets/icons/info.png";
import "./Review.css";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Review = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [farmInfo, setFarmInfo] = useState(null);
  const [Reviews, setReviews] = useState([]); // 검색결과 배열에 담아줌
  const [rateAvg, setRateAvg] = useRecoilState(ratingAvg);
  const [thislocation, setThislocation] = useRecoilState(thisloc);

  const [done, setDone] = useState(false);

  async function getLocation(farmID) {
    await axios
      .get(process.env.REACT_APP_DB_HOST+`/api/farms/${farmID}`)
      .then((res) => {
        setFarmInfo(res.data)
        console.log(res.data)
        setThislocation({
          x: res.data.location_x,
          y: res.data.location_y,
        });
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }

  useEffect(() => {
    getLocation(params.farmId);
    axios
      .get(process.env.REACT_APP_DB_HOST+`/api/farms/${params.farmId}/reviews`)
      .then((res) => {
        setReviews((Reviews) => []);
        res.data.forEach((e) => {
          setReviews((prev) => [
            ...prev,
            {
              id: e.id,
              nickname: e.nickname,
              contents: e.contents,
              rating: e.rating,
            },
          ]);
        });
        setDone(true);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, []);

  useEffect(() => {
    //리뷰 평균
    const rating = [0];
    Reviews.map((item, i) => {
      const rate = Number(item.rating);
      rating[i] = rate;
    });
    const result = rating.reduce(function add(sum, currValue) {
      return sum + currValue;
    }, 0);

    console.log((result / rating.length).toFixed(2));
    setRateAvg((result / rating.length).toFixed(2));
  }, [done]);

  //리뷰쓰러가기
  function makeReview() {
    navigate(`/home/review/make/${params.farmId}`);
  }
  const reviewsettings = {
    dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: false, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 1.4, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
  };

  return (
    <div className="review">
      <h2>농장 정보</h2>
      {farmInfo&&
      <div style={{marginBottom: '40px'}}>
        <h3>{farmInfo.name}</h3>
        <div>
          {farmInfo.address != 'none' &&
          <div className="farmInfo">
            <img src={pin} alt=""/>
            <div>{farmInfo.address}</div>
          </div>
          }
          {farmInfo.placeUrl != 'none' &&
          <div className="farmInfo">
            <img src={link} alt=""/>
            <a href={farmInfo.placeUrl} target="_blank" rel="noopener noreferrer">{farmInfo.placeUrl}</a>
          </div>
          }
          {farmInfo.phone != 'none' &&  
          <div className="farmInfo">
            <img src={call} alt=""/>
            <a href={`tel:${farmInfo.phone}`}>{farmInfo.phone}</a>
          </div>
          }
          {farmInfo.contents != 'none' &&
          <div className="farmInfo">
            <img src={info} alt=""/>
            <div>{farmInfo.contents}</div>
          </div>
          }
        </div>
      </div>
      }
      <hr></hr>
      <h2>추천도</h2>
      <Chart />
      <hr></hr>
      <h2 style={{ marginBottom: "0" }}>
        리뷰보기{" "}
        <span style={{ fontSize: "15px", color: "#8AAD87" }}>
          리뷰 {Reviews.length}개
        </span>
      </h2>
      <button className="makeReview" onClick={makeReview}>
        나도 리뷰 남기기
      </button>
      <Slider {...reviewsettings}>
        {Reviews.map((item, i) => (
          <div className="itemwrap" key={i}>
            <div key={i} className="reviews">
              <img src={quotes} className="quotes"></img>
              <div className="content">
                <div className="rating">
                  평점 <b style={{ fontSize: "20px" }}>"{item.rating}"</b>
                </div>
                <div className="contents">{item.contents}</div>
                <div className="nickname">
                  <b>{item.nickname}</b> 님
                </div>
                <div>{item.title}</div>
              </div>
              <img src={triangle} className="triangle"></img>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default Review;
