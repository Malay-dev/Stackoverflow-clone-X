import express from "express";

import {
  deleteComment,
  postComment,
  editComment,
} from "../controllers/comment.js";

import auth from "../middlewares/auth.js";

const commentRoutes = express.Router();
commentRoutes.patch("/post/:id", auth, postComment);
commentRoutes.patch("/delete/:id", auth, deleteComment);
commentRoutes.patch("/edit/:id", auth, editComment);
export default commentRoutes;
