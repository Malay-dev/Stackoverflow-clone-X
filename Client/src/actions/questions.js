import * as api from "../api";

export const askQuestion = (questionData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postQuestion(questionData);
    dispatch({ type: "POST_QUESTION", payload: data });
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllQuestions = () => async (dispatch) => {
  try {
    const { data } = await api.getAllQuestions();
    dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuestion = (id, navigate) => async (dispatch) => {
  try {
    const { data } = api.deleteQuestion(id);
    dispatch(fetchAllQuestions());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
/* -------------------------------------------------------------- */
export const postAnswer = (answerData) => async (dispatch) => {
  try {
    const { id, numAnswers, answerBody, userAnswered, userId } = answerData;
    const { data } = await api.postAnswer(
      id,
      numAnswers,
      answerBody,
      userAnswered,
      userId
    );
    dispatch({ type: "POST_ANSWER", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnswer = (id, answerId, numAnswers) => async (dispatch) => {
  try {
    const { data } = await api.deleteAnswer(id, answerId, numAnswers);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
/*-----------------------------------------------------------------------------*/
export const postComment = (commentData) => async (dispatch) => {
  try {
    const { id, commentBody, userCommented, userId } = commentData;
    console.log(commentData);
    const { data } = await api.postComment(
      id,
      commentBody,
      userCommented,
      userId
    );
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(id, commentId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const editComment = (id, editedData) => async (dispatch) => {
  try {
    console.log(editedData);
    const { data } = await api.editComment(id, editedData);
    console.log(data);
    dispatch({ type: "EDIT_COMMENT", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};
