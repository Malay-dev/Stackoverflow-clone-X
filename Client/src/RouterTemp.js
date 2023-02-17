import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import Auth from "./components/Pages/Auth/Auth";
import Question from "./components/Pages/Questions/Question";
import AskQuestion from "./components/Pages/Home/AskQuestion/AskQuestion";
import DisplayQuestion from "./components/Pages/Questions/DisplayQuestion";
import Tags from "./components/Pages/Tags/Tags";
import Users from "./components/Pages/Users/Users";
import UserProfile from "./components/Pages/UserProfile/UserProfile";
function RouterTemp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Auth" element={<Auth></Auth>}></Route>
      <Route path="/Questions" element={<Question></Question>}></Route>
      <Route path="/AskQuestion" element={<AskQuestion></AskQuestion>}></Route>
      <Route
        path="/Questions/:id"
        element={<DisplayQuestion></DisplayQuestion>}></Route>
      <Route path="/Tags" element={<Tags></Tags>}></Route>
      <Route path="/Users" element={<Users></Users>}></Route>
      <Route path="/Users/:id" element={<UserProfile></UserProfile>}></Route>
    </Routes>
  );
}

export default RouterTemp;
