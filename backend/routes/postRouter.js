const { Router } = require("express");
const postController = require('../controllers/postController.js')
const { verifyToken } = require("../middlewares/verifyToken.js");
const router = Router();

// console.log('Post Controller:', postController);
router.get("/all", verifyToken, postController.getAllPosts);
router.get("/:user_id", verifyToken, postController.getPostsById);
// router.get("/auth", verifyToken, postController.verifyAuth);
module.exports = router;