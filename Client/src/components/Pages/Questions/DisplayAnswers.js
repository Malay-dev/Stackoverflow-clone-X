import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import moment from "moment";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteAnswer } from "../../../actions/questions";

import Avatar from "../../Avatar/Avatar";

function DisplayAnswers({ question }) {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.currentUserReducer);
  const url = `https://stack-overflow-x.netlify.app${location.pathname}`;

  const handleShare = () => {
    copy(url);
    alert("Copied URL :" + url);
  };
  const handleDelete = (answerId, numAnswers) => {
    dispatch(deleteAnswer(id, answerId, numAnswers - 1));
  };

  useEffect(() => {}, [question]);
  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user">
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {user?.result?._id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.numAnswers)}>
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans?.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}>
                <Avatar backgroundColor={"green"} px="30px" py="40px">
                  {ans.userAnswered.charAt(0).toLocaleUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayAnswers;
