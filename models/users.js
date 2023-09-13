const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  quizzes: [{
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  }]
});
