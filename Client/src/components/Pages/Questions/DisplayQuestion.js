import React from "react";

import "./DisplayQuestion.css";

import QuestionDetails from "./QuestionDetails";
import LeftSideBar from "../Home/LeftSideBar";
import RightSideBar from "../Home/RightSideBar";

function DisplayQuestion() {
  return (
    <div className="disp-question-container-1">
      <LeftSideBar></LeftSideBar>
      <div className="disp-question-container-2">
        <QuestionDetails></QuestionDetails>
        <RightSideBar></RightSideBar>
      </div>
    </div>
  );
}

export default DisplayQuestion;
