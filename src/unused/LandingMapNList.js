import React, { useState } from 'react'
import MapNList from "components/kakaoMap/MapNList";

function  LandingMapNList() {
  const [InputText, setInputText] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputText('')
  }

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input placeholder="검색어를 입력하세요" onChange={onChange} value={InputText} />
        <button type="submit">검색</button>
      </form>
      <MapNList />
    </>
  )
}

export default LandingMapNList