import questions from "../models/questions.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody, userCommented, userId } = req?.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  try {
    const updatedQuestion = await questions.findByIdAndUpdate(_id, {
      $addToSet: {
        comment: [{ commentBody, userCommented, userId: userId }],
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentId } = req?.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("Comment unavailable...");
  }
  try {
    await questions.updateOne(
      { _id },
      { $pull: { comment: { _id: commentId } } }
    );
    res.status(200).json({ message: "Succesfully deleted answer..." });
  } catch (error) {
    console.log(error);
    res.status(405).json(error);
  }
};

export const editComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentId } = req?.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("Comment unavailable...");
  }
  try {
    await questions.updateOne(
      { _id, "comment._id": commentId },
      {
        $set: {
          "comment.$.commentBody": req?.body?.editedComment,
        },
      }
    );
    res.status(200).json({ message: "Succesfully deleted answer..." });
  } catch (error) {
    console.log(error);
    res.status(405).json(error);
  }
};

/*
comment: {
            commentId: commentId,
            commentBody: req?.body?.editedComment,
            userCommented: req?.body?.userCommented,
            userId: req?.body?.userId,
            commentedOn: req?.body?.commentedOn,
          },
*/
