import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import morgan from "morgan";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import userAnswerRoutes from "./routes/userAnswerRoutes.js";

// conf env
dotenv.config();
// config connect db
connectDB();
// rest obj
const app = express();
// middleware
app.use(express.json());
app.use(morgan("dev"));
// rest api
app.get("/", (req, res) => {
  res.send("server is connected");
});
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/userAnswer", userAnswerRoutes);
// port
const PORT = process.env.PORT || 3000;
// run listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
