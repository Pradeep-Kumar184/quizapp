import quizModel from "../models/quizModel.js";
// create Quiz
export const createQuizController = async (req, res) => {
  try {
    const { title, description, category, difficulty } = req.body;
    // validators
    if (!title) {
      return res.send({ message: "please provide title" });
    }
    if (!description) {
      return res.send({ message: "please provide description" });
    }
    if (!category) {
      return res.send({ message: "please provide category" });
    }
    if (!difficulty) {
      return res.send({ message: "please provide difficulty" });
    }

    // existing quiz
    const existingQuiz = await quizModel.findOne({
      title,
    });
    if (existingQuiz) {
      return res.status(401).send({
        success: false,
        message: "Quiz already available",
      });
    }
    // create quiz
    const quiz = new quizModel({
      title,
      description,
      category,
      difficulty,
    });
    await quiz.save();
    return res.status(201).send({
      success: true,
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in create quiz",
      error: error.message,
    });
  }
};
// get quiz
export const getAllQuizController = async (req, res) => {
  try {
    const quiz = await quizModel.find({});
    return res.status(200).send({
      success: true,
      message: "Successfully get All Quiz",
      quiz,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get all quiz",
      error,
    });
  }
};

// get single quiz
export const getSingleQuizController = async (req, res) => {
  try {
    const id = req.params.id;
    const quiz = await quizModel.findById(id).populate("questions");
    if (!quiz) {
      return res.status(401).send({
        success: false,
        message: "Error in get single quiz",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "get successfully single quiz",
        quiz,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get single quiz",
      error,
    });
  }
};
// update quiz
export const updateQuizController = async (req, res) => {
  try {
    const { title, description, category, difficulty } = req.body;
    const { id } = req.params;
    const quiz = await quizModel.findByIdAndUpdate(
      id,
      { title, description, category, difficulty },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Quiz updated successfully",
      quiz,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update quiz",
      error,
    });
  }
};
// get quiz by difficulty
export const getQuizByDifficulty = async (req, res) => {
  try {
    const difficultyLevel = req.params.difficultyLevel;
    if (
      difficultyLevel == "Hard" ||
      difficultyLevel == "Easy" ||
      difficultyLevel == "Medium"
    ) {
      const quiz = await quizModel
        .find({ difficulty: difficultyLevel })
        .populate("questions");
      return res.status(200).send({
        success: true,
        message: "quiz get successfully by difficulty",
        quiz,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get quiz by difficulty",
      error,
    });
  }
};
