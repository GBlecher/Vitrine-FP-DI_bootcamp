const { db } = require('../config/db')
const bcrypt = require('bcrypt')



module.exports = {

  getAllPosts: async () => {
    try {
      const posts = await db("posts")
        .select("user_id", "title", "post_url", "credit", "hyperlink", "created_at", "tags")
        .orderBy("created_at", "desc");;
      return posts;
    } catch (error) {
      throw error;
    }
  },

  getPostsById: async (user_id) => {
    try {
      const posts = await db("posts")
        .select("user_id", "title", "post_url", "credit", "hyperlink", "created_at", "tags")
        .where({ user_id: user_id })
        .orderBy("created_at", "desc")
      return posts;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Could not fetch posts");
    }
  },


}