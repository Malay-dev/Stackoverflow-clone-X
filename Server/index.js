import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import commentRoutes from "./routes/comments.js";
import locationRoutes from "./routes/location.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a StackOverflow clone api");
});

const PORT = process.env.PORT || 5000;

const DATABASE_URL = process.env.CONNECTION_URL;

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/comments", commentRoutes);
app.use("/location", locationRoutes);

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server Running on port - ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
