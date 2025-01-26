const { Router } = require("express");
const userController = require('../controllers/userController.js')
const { verifyToken } = require("../middlewares/verifyToken.js");
const router = Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/all", verifyToken, userController.getUsers);
router.get("/auth", verifyToken, userController.verifyAuth);
router.get("/:id", verifyToken, userController.getUserById);
router.post("/logout", userController.logoutUser);
router.put("/:id", verifyToken, userController.updateUserInfo);
module.exports = router;