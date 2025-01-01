
# Quiz Application

This is a backend application for a quiz app where users can select quiz by difficulty level and play quiz. It provides functionalities for user authentication, quiz management, and question management and user quiz result .

## Features

- User sign up and login with Email and password
- User can view the list of candidates
- User can reset password if he forgot
- Admin can manage quiz and question (add, update, delete)
  

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication

  ## Deployment

The application is deployed and can be accessed at the following link:

[Deployed Application](https://quizapp-xwng.onrender.com)


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Pradeep-Kumar184/quizapp.git


# API Endpoints

## Authentication

### Sign Up
- `POST /api/v1/auth/register`: Sign up a user

### Login
- `POST /api/v1/auth/login`: Login a user
  
## Quiz

### Get All Quiz
- `GET /api/v1/quiz/getAllQuiz`: Get the list of quizzes 
  
### Get Single Quiz
- `GET /api/v1/quiz/getOne/:id`: Get the single quiz
  
### Get Single Quiz By Difficulty
- `GET /api/v1/quiz/getQuizByDifficulty/difficulty`: Get the quiz by difficulty 

### Add Quiz
- `POST /api/v1/quiz/createQuiz`: Add a new quiz (Admin only)

### Update Quiz
- `PUT /api/v1/quiz/updateQuiz/:id`: Update a quizby ID (Admin only)

### Delete Quiz
- `DELETE /api/v1/quiz/deleteQuiz/:id`: Delete a quiz by ID (Admin only)


### Result

### Quiz Result
- `POST /api/v1/userAnswer/submitAnswer`: Submit Quiz
  
### Get Quiz Result
- `GET /api/v1/userAnswer/getResult/:id`: Get the Quiz Result

## Question

### Add Question In Quiz
- `POST /api/v1/question/createQuestion`: Add Question (Admin Only)

### Update Question
- `PUT /api/v1/question/updateQuestion/:id`: Update Question (Admin only)
  
### Delet Question
- `DELETE /api/v1/question/deleteQuestion/:id`: Delete Question (Admin only)

## User Profile

### Get Profile
- `GET /api/v1/auth/getUser`: Get user profile information
  
### Update Profile
- `PUT /api/v1/auth/updateUser/:id`: Update user profile information

### Forget Password
- `POST /api/v1/auth/forgot-password`: Reset user password
