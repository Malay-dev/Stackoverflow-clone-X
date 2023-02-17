import React from "react";

import "./RightSideBar.css";

import Widget from "../../Widgets/Widget";
import WidgetTags from "../../Widgets/WidgetTags";
function RightSideBar() {
  return (
    <aside className="right-sidebar">
      <Widget></Widget>
      <WidgetTags></WidgetTags>
    </aside>
  );
}

export default RightSideBar;
