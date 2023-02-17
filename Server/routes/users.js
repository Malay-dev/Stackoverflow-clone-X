import express from "express";

import auth from "../middlewares/auth.js";

import { login } from "../controllers/auth.js";
import { signup } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);

userRoutes.get("/getAllUsers", getAllUsers);
userRoutes.patch("/update/:id", auth, updateProfile);
export default userRoutes;
