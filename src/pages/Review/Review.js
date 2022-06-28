import React, {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import { useParams } from "react-router-dom";
import axios from 'axios';
import {ratingAvg} from '../../Atom';
import ReviewChart from "pages/Review/ReviewChart";
import { Link } from 'react-router-dom';
import quotes from 'assets/icons/quotes.png'
import triangle from 'assets/icons/triangle.png'
import './Review.css';
import { useNavigate } from "react-router-dom";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Review =()=>{
  const navigate = useNavigate();
    const params = useParams();
    const [Reviews, setReviews] = useState([])  // 검색결과 배열에 담아줌
    const [rateAvg, setRateAvg] = useRecoilState(ratingAvg);

    async function getData(cate) {
        await axios.get(`/api/review/findname/${cate}`).then(
          (res) => {
            setReviews((Reviews) => []);
            res.data.data.forEach((e) =>{
              setReviews((prev)=>[...prev,{
                id: e.id,
                nickname: e.nickname,
                contents: e.contents,
                rating: e.rating
              }]);
            });
          }
        )
        .catch((err)=>{
          console.log(err);
        })
      }
      
      const rating = [0];
      Reviews.map((item, i) => {
        const rate = Number(item.rating);
        rating[i] = rate;
      });

      const result = rating.reduce(function add(sum, currValue) {
        return sum + currValue;
      }, 0);
      setRateAvg((result / rating.length).toFixed(2));

      useEffect(() => {
        getData(params.farmId);
      }, [])
    function makeReview() {
      console.log('리뷰뷰');
      navigate(`/home/review/make/${params.farmId}`)

    }
    const reviewsettings = {
      dots: false, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
      infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
      speed: 500, // 애미메이션의 속도, 단위는 milliseconds
      slidesToShow: 1.7, // 한번에 몇개의 슬라이드를 보여줄 지
      slidesToScroll: 1 // 한번 스크롤시 몇장의 슬라이드를 넘길지
    };

    return(
        <div className='review'>  
            <h2>리뷰</h2>
            <button onClick={makeReview}>나도 리뷰남기기</button>
            <ReviewChart></ReviewChart>
            {
              (rateAvg==0) ? <p>아직 <b>리뷰가 없어요!</b></p> : (rateAvg >3.0) ? <p>이 농장 <b>추천해요!</b></p> : <p>이 농장 <b>추천하지 않아요!</b></p>
            }
            <Slider {...reviewsettings}>
            {Reviews.map((item, i) => (
                <div key={i} className='reviews'>
                  <img src={quotes} className='quotes'></img>
                  <div className='content'>
                    <div>{item.rating}</div>
                    <div>{item.contents}</div>   
                    <div className='name'><b>{item.nickname}</b> 님</div>
                    <div>{item.title}</div>                                    
                  </div>
                  <img src={triangle} className='triangle'></img>
                </div>
            ))}
            </Slider>
        </div>
    )
}
export default Review;