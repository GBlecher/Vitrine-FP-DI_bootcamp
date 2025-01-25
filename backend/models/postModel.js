const { db } = require('../config/db')
const bcrypt = require('bcrypt')



module.exports = {

    getPostById: async (user_id) => {
      try {
        const user = await db("posts")
        .select("user_id", "title", "post_url", "credit", "hyperlink", "created_at", "tags")
          .where({ user_id: user_id })
          .first();
        return user;
      } catch (error) {
        throw error;
      }
    },
  getAllPosts: async () => {
    try {
      const posts = await db("posts").select("user_id", "title", "post_url", "credit", "hyperlink", "created_at", "tags").orderBy("created_at", "desc");;
      return posts;
    } catch (error) {
      throw error;
    }
  },
  

}