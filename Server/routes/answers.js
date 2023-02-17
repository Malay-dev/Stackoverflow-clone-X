import express from "express";

import { postAnswer } from "../controllers/answer.js";
import { deleteAnswer } from "../controllers/answer.js";

import auth from "../middlewares/auth.js";

const answerRoutes = express.Router();
answerRoutes.patch("/post/:id", auth, postAnswer);
answerRoutes.patch("/delete/:id", auth, deleteAnswer);

export default answerRoutes;
