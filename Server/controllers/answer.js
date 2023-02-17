import questions from "../models/questions.js";
import mongoose from "mongoose";

export const postAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { numAnswers, answerBody, userAnswered, userId } = req?.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  updateNoOfQuestions(_id, numAnswers);
  try {
    const updatedQuestion = await questions.findByIdAndUpdate(_id, {
      $addToSet: {
        answer: [{ answerBody, userAnswered, userId: userId }],
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateNoOfQuestions = async (_id, numAnswers) => {
  try {
    await questions.findByIdAndUpdate(_id, {
      $set: { numAnswers: numAnswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerId, numAnswers } = req?.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    return res.status(404).send("Answer unavailable...");
  }
  updateNoOfQuestions(_id, numAnswers);
  try {
    await questions.updateOne(
      { _id },
      { $pull: { answer: { _id: answerId } } }
    );
    res.status(200).json({ message: "Succesfully deleted answer..." });
  } catch (error) {
    console.log(error);
    res.status(405).json(error);
  }
};
