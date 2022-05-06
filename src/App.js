import React, { useState } from 'react';
import './App.css';
import Header from './Header'; 
import Section01 from './Section01';
import KakaoMap from "./KakaoMap";
import Chart from "./Chart";
import Check from "./Check";


function App() {
  return (
    <div className="App">
      <Header />
      <Section01></Section01>
      <KakaoMap></KakaoMap>
      <Chart></Chart>
      <Check></Check>
    </div>
  );
}

export default App;
