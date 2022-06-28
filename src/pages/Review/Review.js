import React, {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import { useParams } from "react-router-dom";
import axios from 'axios';
import {ratingAvg} from '../../Atom';
import ReviewChart from "pages/Review/ReviewChart";
import quotes from 'assets/icons/quotes.png'
import triangle from 'assets/icons/triangle.png'
import './Review.css';


const Review =()=>{
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
      
      const rating = [];
      Reviews.map((item, i) => {
        const rate = Number(item.rating);
        rating[i] = rate;
      });

      const result = rating.reduce(function add(sum, currValue) {
        return sum + currValue;
      }, 0);
      
      setRateAvg((result / rating.length).toFixed(2));

      useEffect(() => {
        getData(params.reviewId);
      }, [])


    return(
        <div className='review'>  
            <h2>리뷰</h2>
            <ReviewChart></ReviewChart>
            {rateAvg > 3.0 ? <p>이 농장 <b>추천해요!</b></p> : <p>이 농장 <b>추천하지 않아요!</b></p>}
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
        </div>
    )
}
export default Review;