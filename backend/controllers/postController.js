const postModel = require("../models/postModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    getAllPosts: async (req, res) => {
        try {
          const posts = await postModel.getAllPosts();
          res.json(posts);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            message: "Internal server error",
          });
        }
      },

      getPostsById: async (req, res) => {
          const { user_id } = req.params;
          try {
            console.log("Fetching posts for user ID:", user_id)
            const posts = await userModel.getPostsById(user_id);
            if (posts.length > 0) {
              return res.status(200).json(posts);
          } else {
              return res.status(404).json({ message: "No posts found for this user." });
          }
          } catch (error) {
            console.error("Error fetching posts:", error);
            return res.status(500).json({ message: "Server error. Please try again later." });
          }
        },
}