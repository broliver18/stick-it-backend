const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  questionType: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
    trim: true,
  },
  shortAnswer: String,
  answerOne: String,
  answerTwo: String,
  answerThree: String,
  answerFour: String,
  correctAnswer: Number,
});

const quizSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",   
  },
  quizName: {
    type: String,
    required: true,
    maxLength: 15,
    trim: true,
  },
  minPoints: {
    type: Number,
    required: true,
    min: -1000,
  },
  maxPoints: {
    type: Number,
    required: true,
    max: 1000,
  },
  questions: [questionSchema],
});

quizSchema.set("timestamps", true);

module.exports = mongoose.model("Quiz", quizSchema);
