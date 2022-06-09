import React, { useState } from 'react'
import MapNList from "components/kakaoMap/MapNList";

function  LandingMapNList({loc, farm, center}) {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState(loc);

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }
  console.log(center);

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
      <MapNList loc={loc} farm={farm} center={center} searchPlace={Place} />
    </>
  )
}

export default LandingMapNList