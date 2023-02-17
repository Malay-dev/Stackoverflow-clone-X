import axios from "axios";

const API = axios.create({
  baseURL: "https://stack-overflow-x-node-server.onrender.com",
}); // http://localhost:5000
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUP = (authData) => API.post("/user/signup", authData);
export const fetchAllUsers = () => API.get("/user/getAllUsers");
/*------------------------------------------------------------------------------*/

export const postQuestion = (question) => API.post("/questions/Ask", question);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

/*------------------------------------------------------------------------------*/

export const postAnswer = (id, numAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answers/post/${id}`, {
    numAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, numAnswers) =>
  API.patch(`/answers/delete/${id}`, { answerId, numAnswers });
/*------------------------------------------------------------------------------*/
export const postComment = (id, commentBody, userCommented, userId) =>
  API.patch(`/comments/post/${id}`, {
    commentBody,
    userCommented,
    userId,
  });
export const deleteComment = (id, commentId) =>
  API.patch(`/comments/delete/${id}`, { commentId });
export const editComment = (id, editedData) =>
  API.patch(`/comments/edit/${id}`, editedData);
/*------------------------------------------------------------------------------*/
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const getLocation = (id) => API.get(`/location/get`);
