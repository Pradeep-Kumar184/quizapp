import quizModel from "../models/quizModel.js";
import userAnswerModel from "../models/userAnswerModel.js";

// submit result
export const submitUserAnswerController = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await quizModel.findById(quizId).populate("questions");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;
    const results = answers.map((userAnswer) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === userAnswer.questionId
      );

      if (!userAnswer.answer) {
        return res.status(400).send({
          success: false,
          message: "Answer is required for each question",
        });
      }

      const correct = question && question.correctAnswer === userAnswer.answer;
      if (correct) score++;
      return {
        questionId: userAnswer.questionId,
        answer: userAnswer.answer,
        correct: !!correct,
      };
    });

    const result = new userAnswerModel({
      userId: req.user.id,
      quizId,
      score,
      answers: results,
    });

    await result.save();

    return res.status(201).send({
      success: true,
      message: "Result submit successfully",
      score,
      result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in submit answer",
      error,
    });
  }
};

// get result
export const getQuizResultController = async (req, res) => {
  try {
    const id = req.params.id;
    const userQuizResult = await userAnswerModel
      .findById(id)
      .populate({
        path: "userId",
        select: "name",
      })
      .populate({
        path: "quizId",
        select: "title",
      })
      .populate({
        path: "answers.questionId",
        select: "questionText",
      })
      .exec();
    return res.status(200).send({
      success: true,
      message: "successfully get result",
      userQuizResult,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get quiz result",
      error,
    });
  }
};
