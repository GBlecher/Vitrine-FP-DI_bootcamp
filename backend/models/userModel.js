const {db} = require('../config/db')
const bcrypt = require('bcrypt')



module.exports = {
    createUser: async (password, email,username ) => {
        const trx = await db.transaction();
        try {
          
          const hashPassword = await bcrypt.hash(password + "", 10);
    
          const [user] = await trx("users").insert(
            {
              email: email.toLowerCase(),
              password: hashPassword,
              username: username,
            },
            ["username","email", "id"]
          );
    
          await trx.commit();
    
          return user;
        } catch (error) {
          await trx.rollback();
          console.log(error);
          throw error;
        }
      },
    getUserByEmail: async (email) => {
      try {
        const user = await db("users")
          .select("id", "email", "password","profilepic","username","bio")
          .where({ email: email.toLowerCase() })
          .first();
        return user;
      } catch (error) {
        throw error;
      }
    },
    getUsers: async () => {
      try {
        const users = await db("users").select("id", "email", "password","profilepic","username","bio");
        return users;
      } catch (error) {
        throw error;
      }
    },
    getUserById: async (id) => {
      try {
        const user = await db("users")
          .select("id", "email", "password","profilepic","username","bio")
          .where({ id: id })
          .first();
        return user;
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (id, updates) => {
      try {
        
        await db("users")
          .where({ id: id })
          .update(updates);

          const updatedUser = await db("users")
          .select("id", "email", "password", "profilepic", "username", "bio")
          .where({ id: id })
          .first();

        return updatedUser;
      } catch (error) {
        throw error;
      }
    },
    

    
}