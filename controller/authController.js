import { comparePassword, hashPassword } from "../helper/helper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
// register
export const registerController = async (req, res) => {
  try {
    const { name, age, email, address, mobile, password, favourite_game } =
      req.body;
    //   validation
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!mobile) {
      return res.send({ message: "mobile no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!age) {
      return res.send({ message: "age is Required" });
    }
    if (!favourite_game) {
      return res.send({ message: "favourite_game is Required" });
    }
    // existing user chk
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: " You already register please login",
      });
    }
    // hash password
    const hashedPassword = await hashPassword(password);
    // create new user
    const user = new userModel({
      name,
      age,
      email,
      address,
      mobile,
      password: hashedPassword,
      favourite_game,
    });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};
// login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email) {
      return res.send({ message: "Please enter your email" });
    }
    if (!password) {
      return res.send({ message: "Please enter your password" });
    }
    // chk user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not register",
      });
    }
    // compare password
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(401).send({
        success: false,
        message: "incorrect password",
      });
    }
    // token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      success: true,
      message: "User login successfully",
      user: {
        id: user.id,
        name: user.name,
        age: user.age,
        address: user.address,
        email: user.email,
        mobile: user.mobile,
        favourite_game: user.favourite_game,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, favourite_game } = req.body;
    // validation
    if (!email) {
      return res.send({ message: "Please enter your email" });
    }
    if (!favourite_game) {
      return res.send({ message: "Please enter your favourite_game" });
    }
    if (!newPassword) {
      return res.send({ message: "Please enter your newPassword" });
    }
    // chk user
    const user = await userModel.findOne({ email, favourite_game });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "email Or favourite_game not available",
      });
    }
    // hash new password
    const hashedPassword = await hashPassword(newPassword);
    // Update user password
    // user.password = hashedPassword;
    // await user.save();
    const updatedPassword = await userModel.findByIdAndUpdate(
      user.id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in forgot-password",
      error,
    });
  }
};
// update
export const updateProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, address, mobile, favourite_game } = req.body;
    const updateProfile = await userModel.findByIdAndUpdate(
      id,
      { name, age, email, address, mobile, favourite_game },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "profile updated successfully",
      updateProfile,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in update user profile",
      error,
    });
  }
};
// get users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "users get successfully",
      users,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get all user profile",
      error,
    });
  }
};
