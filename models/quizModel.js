import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },

    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "hard"],
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("quiz", quizSchema);
