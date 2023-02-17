import React from "react";

import "./Question.css";

import LeftSideBar from "../Home/LeftSideBar";
import RightSideBar from "../Home/RightSideBar";
import HomeMainBar from "../Home/HomeMainBar";

function Question() {
  return (
    <div className="question-container-1">
      <LeftSideBar></LeftSideBar>
      <div className="question-container-2">
        <HomeMainBar></HomeMainBar>
        <RightSideBar></RightSideBar>
      </div>
    </div>
  );
}

export default Question;
