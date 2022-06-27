import React, {useState, useEffect} from 'react';
import {useRecoilState} from 'recoil';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const Review =()=>{
    const params = useParams();
    // console.log(params.reviewId);
    const [Reviews, setReviews] = useState([])  // 검색결과 배열에 담아줌

    async function getData(cate) {
        // console.log(cate);
        await axios.get(`/api/review/findname/${cate}`).then(
          (res) => {
            setReviews((Reviews) => []);
            res.data.data.forEach((e) =>{
            //   console.log(e) //{id: 1, category: 'EXP', name: '가나안농장', reviews: Array(0), reviewRating: 0, …}
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
    
      useEffect(() => {
        getData(params.reviewId);
      }, [])

    return(
        <div className='review'>  
            <h2>리뷰</h2>
            {Reviews.map((item, i) => (
                <div key={i} className=''>
                    <div>{item.id}</div>
                    <div>{item.rating}</div>
                    <div>{item.nickname}</div>
                    <div>{item.title}</div>
                    <div>{item.contents}</div>
                </div>
            ))}
        </div>
    )
}
export default Review;