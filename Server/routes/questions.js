import express from "express";

import { askQuestion } from "../controllers/question.js";
import { getAllQuestions } from "../controllers/question.js";
import { deleteQuestion } from "../controllers/question.js";
import { voteQuestion } from "../controllers/question.js";

import auth from "../middlewares/auth.js";

const questionRoutes = express.Router();
questionRoutes.post("/Ask", auth, askQuestion);
questionRoutes.get("/get", getAllQuestions);
questionRoutes.delete("/delete/:id", auth, deleteQuestion);
questionRoutes.patch("/vote/:id", auth, voteQuestion);
export default questionRoutes;
