import React from "react";
import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteComment } from "../../../actions/questions";
import { editComment } from "../../../actions/questions";

import "./DisplayQuestion.css";

const CancelBtn = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width={"10px"}>
    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
  </svg>
);

function CommentBody({ comment }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.currentUserReducer);
  const [toggleEdit, setToggleEdit] = useState(false);

  const [editedComment, setEditedComment] = useState(comment.commentBody);
  const handleDelete = (commentId) => {
    dispatch(deleteComment(id, commentId));
  };
  const handleToggle = () => {
    if (toggleEdit === false) {
      setToggleEdit(true);
    } else {
      setToggleEdit(false);
    }
    console.log(toggleEdit);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(editedComment);
    dispatch(
      editComment(id, {
        commentId: comment._id,
        editedComment: editedComment,
        userCommented: comment.userCommented,
        userId: comment.userId,
        commentedOn: comment.commentedOn,
      })
    );
    setToggleEdit(false);
  };
  return (
    <div className="display-comments">
      <div style={{ flex: "0.9" }}>
        <div>
          {!toggleEdit ? (
            <p>{comment.commentBody}</p>
          ) : (
            <div className="post-comment-container">
              <div className="form-page">
                <form
                  onSubmit={(e) => {
                    handleEdit(e);
                  }}>
                  <input
                    type="text"
                    name="comment"
                    id="comment"
                    className="input-comment"
                    value={editedComment}
                    autoComplete="off"
                    onChange={(e) => {
                      setEditedComment(e.target.value);
                    }}
                  />
                </form>
                <button className="edit-cancel-btn" onClick={handleToggle}>
                  {CancelBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="comment-info-container">
        <div className="comment-controls">
          {user?.result?._id === comment?.userId && (
            <button type="button" onClick={() => handleDelete(comment._id)}>
              Delete
            </button>
          )}
          {user?.result?._id === comment?.userId && !toggleEdit && (
            <button type="button" onClick={() => handleToggle()}>
              Edit
            </button>
          )}
        </div>
        <div className="comment-info">
          <Link
            to={`/Users/${comment?.userId}`}
            className="user-link"
            style={{ color: "#0086d8" }}>
            <div>{comment.userCommented}</div>
          </Link>
          <p className="user-commented"></p>
          <p>- {moment(comment.commentedOn).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentBody;
