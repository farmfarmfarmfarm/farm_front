import React, { useState, useEffect } from "react";
import Disease from "./Disease";
import "./Care.css";

const Care = () => {
  return (
    <div style={{ padding: "0px 10px" }}>
      <h2>작물로 치유하기</h2>
      <Disease />
    </div>
  );
};
export default Care;
