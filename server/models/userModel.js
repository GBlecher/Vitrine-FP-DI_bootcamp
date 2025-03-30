const { db } = require('../config/db')
const bcrypt = require('bcrypt')



module.exports = {
  // Create a new user with hashed password
  createUser: async (password, email, username) => {
    const trx = await db.transaction();// Start a database transaction
    try {

      const hashPassword = await bcrypt.hash(password + "", 10);

      // Insert new user into the database and return specific fields
      const [user] = await trx("users").insert(
        {
          email: email.toLowerCase(),
          password: hashPassword,
          username: username,
        },
        ["username", "email", "id"]// Return these fields from the insert
      );

      await trx.commit();

      return user;
    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw error;
    }
  },
  getUserByIdentifier: async (identifier, isEmail) => {
    try {
      const query = db("users").select("id", "email", "password", "profilepic", "username", "bio");

      if (isEmail) {
        query.where({ email: identifier.toLowerCase() });
      } else {
        query.where({ username: identifier });
      }

      const user = await query.first();
      return user;
    } catch (error) {
      throw error;
    }
  },
  // Retrieve a user by their email address
  getUserByEmail: async (email) => {
    try {
      const user = await db("users")
        .select("id", "email", "password", "profilepic", "username", "bio")
        .where({ email: email.toLowerCase() })
        .first();
      return user;
    } catch (error) {
      throw error;
    }
  },
  // Retrieve all users from the database
  getUsers: async () => {
    try {
      const users = await db("users").select("id", "email", "password", "profilepic", "username", "bio");
      return users;
    } catch (error) {
      throw error;
    }
  },
  // Retrieve a user by their ID
  getUserById: async (id) => {
    try {
      const user = await db("users")
        .select("id", "email", "password", "profilepic", "username", "bio")
        .where({ id: id })
        .first();
      return user;
    } catch (error) {
      throw error;
    }
  },
  // Update a user's information
  updateUserInfo: async (id, updates) => {
    try {

      await db("users")
        .where({ id: id })
        .update(updates);
      // Retrieve updated user data from the database
      const updatedUser = await db("users")
        .select("id", "email", "password", "profilepic", "username", "bio")
        .where({ id: id })
        .first();

      return updatedUser;
    } catch (error) {
      throw error;
    }
  },
  // Delete a user by their ID
  deleteUserById: async (id) => {
    try {
      const result = await db('users')
        .where({ id })
        .del();

      return result;
    } catch (error) {
      console.error("Error in model deleteUserById:", error);
      throw error;
    }
  },
};



