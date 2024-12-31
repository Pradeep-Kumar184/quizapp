import questionModel from "../models/questionModel.js";
import quizModel from "../models/quizModel.js";

export const createQuestionController = async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer, difficulty } =
      req.body;
    // validation
    if (!quizId) {
      return res.status({ message: "Please provide quizId" });
    }
    if (!questionText) {
      return res.status({ message: "Please provide question text" });
    }
    if (!options) {
      return res.status({ message: "Please provide options" });
    }
    if (!correctAnswer) {
      return res.status({ message: "Please provide correctAnswer" });
    }
    if (!difficulty) {
      return res.status({ message: "Please provide difficulty" });
    }
    const existingQuestion = await questionModel.findOne({
      questionText,
    });
    if (existingQuestion) {
      return res.status(401).send({
        success: false,
        message: "Question already available",
      });
    }
    const question = new questionModel({
      quizId,
      questionText,
      options,
      correctAnswer,
      difficulty,
    });
    await question.save();

    const quiz = await quizModel.findById(quizId);
    if (!quiz) {
      return res.status(404).send({
        success: false,
        message: "Quiz not found",
      });
    }
    quiz.questions.push(question.id);
    await quiz.save();
    return res.status(201).send({
      success: true,
      message: "Question created and added to quiz question successfully",
      question,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create question",
      error: error.message,
    });
  }
};
// get question
export const updateQuestionController = async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer, difficulty } =
      req.body;
    const { id } = req.params;
    const updateQuestion = await questionModel.findByIdAndUpdate(
      id,
      { quizId, questionText, options, correctAnswer, difficulty },
      {
        new: true,
      }
    );
    return res.status(200).send({
      success: true,
      message: "Question updated successfully",
      updateQuestion,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update question",
      error,
    });
  }
};
// delete question
export const deleteQuestionController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuestion = await questionModel.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).send({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Question deleted successfully",
      deletedQuestion,
    });
  } catch (error) {
    console.error(`Error deleting question with id: ${req.params.id}`, error);
    return res.status(500).send({
      success: false,
      message: "Error in delete question",
      error,
    });
  }
};
