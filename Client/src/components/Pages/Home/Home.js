import React from "react";

import "./Home.css";

import LeftSideBar from "./LeftSideBar";
import HomeMainBar from "./HomeMainBar";
import RightSideBar from "./RightSideBar";
function Home() {
  return (
    <div className="home-container-1">
      <LeftSideBar></LeftSideBar>
      <div className="home-container-2">
        <HomeMainBar></HomeMainBar>
        <RightSideBar></RightSideBar>
      </div>
    </div>
  );
}

export default Home;
