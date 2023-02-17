import React from "react";
import CommentBody from "./CommentBody";

function DisplayComments({ question }) {
  return (
    <div>
      {question?.comment?.map((comment) => (
        <div key={comment._id}>
          <CommentBody key={comment._id} comment={comment}></CommentBody>
        </div>
      ))}
    </div>
  );
}

export default DisplayComments;
