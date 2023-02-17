import React from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";

import DisplayAnswers from "./DisplayAnswers";
import DisplayComments from "./DisplayComments";
import Avatar from "../../Avatar/Avatar";

import moment from "moment";
import copy from "copy-to-clipboard";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  postAnswer,
  voteQuestion,
} from "../../../actions/questions";
import { postComment } from "../../../actions/questions";

const upVote = (
  <svg
    className="votes-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512">
    <path d="M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z" />
  </svg>
);
const downVote = (
  <svg
    className="votes-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512">
    <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
  </svg>
);

function QuestionDetails() {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);

  /* var questionsList = [
    {
      _id: "1",
      upVotes: 3,
      downVotes: 2,
      numAnswers: 2,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["java", "node js", "react js", "mongo db", "express js"],
      userPosted: "mano",
      userId: 1,
      askedOn: "jan 1",
      answer: [
        {
          answerBody: "Answer",
          userAnswered: "kumar",
          answeredOn: "jan 2",
          userId: 2,
        },
      ],
    },
    {
      _id: "2",
      upVotes: 3,
      downVotes: 2,
      numAnswers: 0,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [
        {
          answerBody: "Answer",
          userAnswered: "kumar",
          answeredOn: "jan 2",
          userId: 2,
        },
      ],
    },
    {
      _id: "3",
      upVotes: 3,
      downVotes: 2,
      numAnswers: 0,
      questionTitle: "What is a function?",
      questionBody: "It meant to be",
      questionTags: ["javascript", "R", "python"],
      userPosted: "mano",
      askedOn: "jan 1",
      userId: 1,
      answer: [
        {
          answerBody: "Answer",
          userAnswered: "kumar",
          answeredOn: "jan 2",
          userId: 2,
        },
      ],
    },
  ];*/

  const user = useSelector((state) => state.currentUserReducer);
  const location = useLocation();
  const url = `https://stack-overflow-x.netlify.app${location.pathname}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState("");
  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();
    if (user == null) {
      alert("Login or SignUp to answer a question");
      navigate("/Auth");
    } else {
      if (answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            numAnswers: answerLength + 1,
            answerBody: answer,
            userAnswered: user?.result?.name,
            userId: user?.result?._id,
          })
        );
      }
    }
  };
  const [comment, setComment] = useState("");
  const handleCommentSubmit = (e) => {
    console.log(comment);
    e.preventDefault();
    if (user == null) {
      alert("Login or SignUp to post a comment");
      navigate("/Auth");
    } else {
      if (comment === "") {
        alert("Enter an comment before submitting");
      } else {
        dispatch(
          postComment({
            id,
            commentBody: comment,
            userCommented: user?.result?.name,
            userId: user?.result?._id,
          })
        );
      }
    }
  };
  const handleShare = () => {
    copy(url);
    alert("Copied URL :" + url);
  };
  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };
  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", user.result._id));
  };
  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", user.result._id));
  };
  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <div style={{ width: "18px" }} onClick={handleUpVote}>
                        {upVote}
                      </div>
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <div style={{ width: "18px" }} onClick={handleDownVote}>
                        {downVote}
                      </div>
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>

                          {user?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}>
                            <Avatar
                              backgroundColor={"Orange"}
                              px="30px"
                              py="40px">
                              {question?.userPosted
                                ?.charAt(0)
                                ?.toLocaleUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.numAnswers !== 0 && (
                  <section>
                    <h3>{question.numAnswers} Answers</h3>
                    <DisplayAnswers
                      key={question._id}
                      question={question}></DisplayAnswers>
                  </section>
                )}
                <section>
                  <h4>Comments</h4>
                  <DisplayComments
                    key={question._id}
                    question={question}></DisplayComments>
                  <section className="post-comment-container">
                    <form
                      onSubmit={(e) => {
                        handleCommentSubmit(e);
                      }}>
                      <input
                        type="text"
                        name="comment"
                        id="comment"
                        className="input-comment"
                        placeholder="Add a comment"
                        autoComplete="off"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </form>
                  </section>
                </section>
                <section className="post-ans-container">
                  <h3>Your Answers</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAnswer(e, question.answer.length);
                    }}>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      onChange={(e) => {
                        setAnswer(e.target.value);
                      }}></textarea>
                    <input
                      type="submit"
                      name=""
                      id=""
                      className="post-ans-btn"
                      value={"Post your answer"}
                    />
                  </form>
                  <p>
                    Browse other Questions Tagged{" "}
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {tag}
                      </Link>
                    ))}{" "}
                    or{" "}
                    <Link
                      to="/AskQuestion"
                      style={{
                        textDecoration: "none",
                        color: "#009dff",
                      }}>
                      ask your own question
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default QuestionDetails;
