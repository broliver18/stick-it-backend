const quizQueries = require("../database/quizQueries");
const userQueries = require("../database/userQueries");

const getAllQuizzes = (req, res) => {
  console.log(req.session)
  const userEmail = req.session.user.email;
  userQueries
    .getUserQuizzes(userEmail)
    .catch((error) => res.json(error))
    .then((quizzes) => res.json(quizzes));
};

const getQuiz = (req, res) => {
  const gameId = req.params.id;
  quizQueries
    .getQuiz(gameId)
    .catch((error) => res.json(error))
    .then((quiz) => res.json(quiz));
};

const createQuiz = (req, res) => {
  const { quizDetails, questions } = req.body;
  if (
    questions.find(
      (questionInfo) =>
        (questionInfo.questionType === "short-answer" &&
          (!questionInfo.question || !questionInfo.shortAnswer)) ||
        (questionInfo.questionType === "multiple-choice" &&
          (!questionInfo.question ||
            !questionInfo.answerOne ||
            !questionInfo.answerTwo ||
            !questionInfo.answerThree ||
            !questionInfo.answerFour ||
            !questionInfo.correctAnswer))
    )
  ) {
    const errorMessage = "Please fill out all required input fields.";
    res.json(errorMessage);
  } else {
    const user = req.session.user;
    quizQueries
      .createQuiz(user, quizDetails, questions)
      .catch((error) => res.json(error))
      .then((message) => res.json(message));
  }
};

const deleteQuiz = (req, res) => {
  const { gameId } = req.body;
  const userEmail = req.session.user.email;
  quizQueries.removeQuiz(gameId).catch((error) => res.json(error));
  userQueries.removeUserQuiz(userEmail, gameId);
};

module.exports = { getAllQuizzes, getQuiz, createQuiz, deleteQuiz };