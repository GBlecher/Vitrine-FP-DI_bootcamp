const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let expireTime = Math.floor(Date.now() / 1000) + (3 * 3600);
module.exports = {
    
  registerUser: async (req, res) => {
    const { password, email, username } = req.body;

    try {
      const user = await userModel.createUser(password, email, username);// Create user in the database
      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "23505") {// Check for unique constraint violation on email 
        res.status(400).json({
          message: "Email already exists",
        });
        return;
      } else {
        res.status(500).json({
          message: "Internal server error",
        });
      }
    }
  },
   // Log in a user
  loginUser: async (req, res) => {
    const { password, email } = req.body;


    try {
      const user = await userModel.getUserByEmail(email);// Fetch user by email

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password + "", user.password);// Compare passwords


      if (!passwordMatch) {
        res.status(404).json({ message: "Username and password do not match" });
        return;
      }
      const { ACCESS_TOKEN_SECRET } = process.env;

      const accessToken = jwt.sign(
        { userid: user.id, email: user.email },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "3h" }
      );


      res.cookie("token", accessToken, {
        maxAge: expireTime,
        httpOnly: true,
      });


      res.status(200).json({
        message: "Login Successfully",
        user: { userid: user.id, email: user.email },
        token: accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers();// Fetch all users
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
   // Get a user by ID
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.getUserById(id);// Fetch user by ID
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found." });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  },
  // Update user information
  updateUserInfo: async (req, res) => {
    const { id } = req.params;
    const { username, email, password, bio, profilepic } = req.body;

    try {
      const user = await userModel.getUserById(id);// Retrieve current user info
      const updatedUser = {
        username: username || user.username,
        email: email || user.email,
        password: password ? await bcrypt.hash(password + "", 10) : user.password,// Hash new password if provided
        bio: bio || user.bio,
        profilepic: profilepic || user.profilepic
      };

      const updatedUserData = await userModel.updateUserInfo(id, updatedUser);// Update user info in the database
      return res.status(200).json({ message: "User updated successfully.", user: updatedUserData });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  },
  // Delete a user
  deleteUser: async (req, res) => {
    const { id } = req.params; 
    try {
      const result = await userModel.deleteUserById(id);
      if (result) {
        return res.status(204).send(); 
      }
      return res.status(404).json({ message: "User not found." });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  },
   // Log out a user
  logoutUser: (req, res) => {
    res.clearCookie("token");// Clear the authentication token from cookies
    req.cookies.token = null;// Clear the token variable in the request
    delete req.cookies.token;// Delete token from cookies object in request
    res.sendStatus(200);
  },
  // Verify user authentication and issue a new access token
  verifyAuth: (req, res) => {
    const { userid, email } = req.user;
    const { ACCESS_TOKEN_SECRET } = process.env;
    // Create a new access token with the same user information
    const newAccessToken = jwt.sign({ userid, email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });
    res.cookie("token", newAccessToken, {// Set the new token in cookies
      httpOnly: true,
      maxAge: expireTime,
    });

    res.json({
      message: "verified",
      user: { userid, email },
      token: newAccessToken,
    });
  },

} 