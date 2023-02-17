import React from "react";

import "./Widget.css";

const Pen = (
  <svg
    style={{ height: "20px", width: "20px" }}
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="pen"
    className="svg-inline--fa fa-pen fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path>
  </svg>
);
const Comment = (
  <svg
    style={{ height: "20px", width: "20px" }}
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="comment-alt"
    className="svg-inline--fa fa-comment-alt fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z"></path>
  </svg>
);
const BlackLogo = (
  <svg
    style={{ height: "20px", width: "20px" }}
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="stack-overflow"
    className="svg-inline--fa fa-stack-overflow fa-w-12"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512">
    <path
      fill="currentColor"
      d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z"></path>
  </svg>
);
function Widget() {
  return (
    <div className="widget">
      <h4>The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <div style={{ height: "20px", width: "20px" }}>{Pen}</div>
          <p>
            Observability is key to the future of software (and your DevOps
            career)
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <div style={{ height: "20px", width: "20px" }}>{Pen}</div>
          <p>Podcast 374: How valuable is your screen name?</p>
        </div>
      </div>
      <h4>Featured on Media</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <div style={{ height: "20px", width: "20px" }}>{Comment}</div>
          <p>Review queue workflows - Final release...</p>
        </div>
        <div className="right-sidebar-div-2">
          <div style={{ height: "20px", width: "20px" }}>{Comment}</div>
          <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <div style={{ height: "20px", width: "20px" }}>{BlackLogo}</div>
          <p>
            Outdated Answers: accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
            Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>
            What is the best course of action when a user has high enough rep
            to...
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
      </div>
    </div>
  );
}

export default Widget;
