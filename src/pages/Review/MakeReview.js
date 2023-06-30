import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Review.css";
import { useNavigate } from "react-router-dom";
import listFarm from "../../assets/icons/listFarm.png";

const MakeReview = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [farm, setFarm] = useState([]);

  async function getData() {
    await axios
      .get(`/api/farms/${params.farmId}`)
      .then((res) => {
        setFarm((prev) => [
          ...prev,
          {
            id: res.data.id,
            name: res.data.name,
            address: res.data.address,
          },
        ]);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }
  useEffect(() => {
    getData();
  }, []);
  function onClickBack() {
    navigate(`/home/review/${params.farmId}`);
  }
  function onClickSave() {
    postData(inputRating, inputTitle, inputText);
    navigate(`/home/review/${params.farmId}`);
  }
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  async function postData(rating, title, contents) {
    try {
      const response = await axios.post(
        `/api/members/${localStorage.getItem("userId")}/farms/${
          params.farmId
        }/reviews`,
        JSON.stringify({ rating, title, contents }),
        { headers }
      );
      console.log("리턴", response);
      alert("저장완료");
    } catch (error) {
      console.error(error);
    }
  }
  const [inputRating, setInputRating] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");

  const onChangeRating = (e) => {
    setInputRating(e.target.value);
  };
  const onChangeTitle = (e) => {
    setInputTitle(e.target.value);
  };
  const onChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div className="review">
      {farm[0] != undefined && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "50px",
              backgroundColor: "#C2D8A2",
            }}
          >
            <button
              onClick={onClickBack}
              style={{
                color: "white",
                backgroundColor: "#A3BA79",
                borderRadius: "5",
                height: "30px",
                width: "60px",
                borderWidth: 0,
                borderRadius: "5px",
              }}
            >
              취소
            </button>
            <div>농장 후기</div>
            <button
              onClick={onClickSave}
              style={{
                color: "white",
                backgroundColor: "#A3BA79",
                borderRadius: "5",
                height: "30px",
                width: "60px",
                borderWidth: 0,
                borderRadius: "5px",
              }}
            >
              저장
            </button>
          </div>
          <div>
            <div
              style={{
                marginTop: "16px",
                width: "100%",
                borderRadius: " 20px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#E6E6E6 ",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    display: "inline-block",
                    marginRight: "20px",
                  }}
                  src={listFarm}
                  alt="로고"
                />
                <div style={{ display: "inline-block", fontSize: "20px" }}>
                  {farm[0].name}
                </div>
              </div>
              <div
                style={{
                  padding: "10px",
                  paddingTop: "0px",
                  marginBottom: "22px",
                  color: "#5f5f5f",
                }}
              >
                {farm[0].address}
              </div>
            </div>
          </div>
        </>
      )}
      <div>
        <input
          type="text"
          placeholder="별점을 입력해주세요 (1.0~5.0)"
          onChange={onChangeRating}
          value={inputRating}
          style={{
            height: "40px",
            width: "100%",
            margin: "10px 0",
          }}
        />
        <input
          type="text"
          placeholder="후기 제목을 남겨주세요"
          onChange={onChangeTitle}
          value={inputTitle}
          style={{
            height: "50px",
            width: "100%",
            margin: "10px 0",
          }}
        />
        <input
          type="text"
          placeholder="농장 후기를 남겨주세요"
          onChange={onChange}
          value={inputText}
          style={{
            height: "300px",
            width: "100%",
            margin: "10px 0",
          }}
        />
      </div>
    </div>
  );
};
export default MakeReview;
