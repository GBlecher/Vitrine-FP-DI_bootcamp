const { Router } = require("express");
const postController = require('../controllers/postController.js')
const { verifyToken } = require("../middlewares/verifyToken.js");
const router = Router();


router.get("/all", verifyToken, postController.getAllPosts);
router.get("/:user_id", verifyToken, postController.getPostsById);
router.post("/new/:user_id", verifyToken, postController.createPost)
// router.get("/auth", verifyToken, postController.verifyAuth);
module.exports = router;