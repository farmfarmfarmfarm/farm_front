import React, { useState, useEffect } from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { textState } from './TextState';

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} placeholder='어느 지역을 찾으시나요?'  />
      <br />
      {text}
    </div>
  );
} 

export default TextInput;