const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let expireTime =  Math.floor(Date.now() / 1000) + (3 * 3600);
module.exports = {
  registerUser: async (req, res) => {
    const { password, email, username } = req.body;

    try {
      const user = await userModel.createUser(password, email, username);
      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "23505") {
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
  loginUser: async (req, res) => {
    const { password, email } = req.body;


    try {
      const user = await userModel.getUserByEmail(email);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password + "", user.password);


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
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.getUserById(id);
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
  updateUserInfo: async (req, res) => {
    const { id } = req.params;
    const { username, email, password, bio, profilepic } = req.body;

    try {

      const updatedUser = {
        username: username || user.username,
        email: email || user.email,
        password: password ? await bcrypt.hash(password + "", 10) : user.password,
        bio: bio || user.bio,
        profilepic: profilepic || user.profilepic
      };

      const updatedUserData = await userModel.updateUserInfo(id, updatedUser);
      return res.status(200).json({ message: "User updated successfully.", user: updatedUserData });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  },

  logoutUser: (req, res) => {
    res.clearCookie("token");
    req.cookies.token = null;
    delete req.cookies.token;
    res.sendStatus(200);
  },
  verifyAuth: (req, res) => {
    const { userid, email } = req.user;
    const { ACCESS_TOKEN_SECRET } = process.env;
    const newAccessToken = jwt.sign({ userid, email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "3h",
    });
    res.cookie("token", newAccessToken, {
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