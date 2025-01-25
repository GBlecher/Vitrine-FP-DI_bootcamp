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
}