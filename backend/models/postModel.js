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
        .select("id","user_id", "title", "post_url", "credit", "hyperlink", "created_at", "tags")
        .where({ user_id: user_id })
        .orderBy("created_at", "desc")
      return posts;
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Could not fetch posts");
    }
  },
  createPost: async ({ user_id, title, post_url, credit, hyperlink, tags }) => {
    try {
        
        const [newPost] = await db("posts").insert({
            user_id,
            title,
            post_url,
            credit: credit || null, 
            hyperlink: hyperlink || null,
            created_at: new Date(), 
            tags: tags || null,
        }).returning("*"); 

        return newPost; 
    } catch (error) {
        console.error("Error creating post:", error);
        throw error; 
    }
},
deletePostById: async (id) => {
  try {
      const result = await db('posts')
          .where({ id })
          .del(); 
      
      return result; 
  } catch (error) {
      console.error("Error in model deletePostById:", error);
      throw error; 
  }
},

}