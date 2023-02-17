import questions from "../models/questions.js";
import mongoose from "mongoose";

export const askQuestion = async (req, res) => {
  const postQuestionData = req.body;
  const userId = req?.body?.userId;

  const postQuestion = new questions({
    ...postQuestionData,
    userId,
  });
  try {
    await postQuestion.save();
    res.status(200).json("Posted a question successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Could'nt post a new question");
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questionList = await questions.find();
    res.status(200).json(questionList);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  try {
    await questions.findByIdAndRemove(_id);
    res.status(200).json({ message: "Successfully deleted the question..." });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const voteQuestion = async (req, res) => {
  const { id: _id } = req.params;
  const { value, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  try {
    const question = await questions.findById(_id);
    const upIndex = question.upVote.findIndex((id) => id === String(userId));
    const downIndex = question.downVote.findIndex(
      (id) => id === String(userId)
    );
    if (String(value) === "upVote") {
      if (downIndex !== -1) {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
      if (upIndex === -1) {
        question.upVote.push(userId);
      } else {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
    } else if (String(value) === "downVote") {
      if (upIndex !== -1) {
        question.upVote = question.upVote.filter((id) => id !== String(userId));
      }
      if (downIndex === -1) {
        question.downVote.push(userId);
      } else {
        question.downVote = question.downVote.filter(
          (id) => id !== String(userId)
        );
      }
    }
    await questions.findByIdAndUpdate(_id, question);
    res.status(200).json({ message: "voted successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
