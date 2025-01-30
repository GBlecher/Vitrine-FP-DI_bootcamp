const postModel = require("../models/postModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
  //Retrieve all posts
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
  // Retrieve posts by user ID
  getPostsById: async (req, res) => {
    const { user_id } = req.params;
    try {
      const posts = await postModel.getPostsById(user_id);
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
  //Creat a new post
  createPost: async (req, res) => {
    const { user_id } = req.params;
    const { title, post_url, credit, hyperlink, tags } = req.body;
    // Validate required fields
    if (!user_id || !title || !post_url) {
      return res.status(400).json({ message: "user_id, title, and post_url are required." });
    }

    try {
      const newPost = await postModel.createPost({ user_id, title, post_url, credit, hyperlink, tags });
      return res.status(201).json({ message: "Post created successfully.", post: newPost });
    } catch (error) {
      console.error("Error creating post in controller:", error);
      return res.status(500).json({ message: "Server error. Could not create post." });
    }
  },
  // Delete a post by ID
  deletePostById: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await postModel.deletePostById(id);
      if (result) {
        return res.status(204).send();
      }
      return res.status(404).json({ message: "Post not found." });
    } catch (error) {
      console.error("Error deleting post:", error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  },

}